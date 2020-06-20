var DeployController = function (view) {
    var context = this;
    context.view = view;

    context.deploy = async function deploy(data, onException) {
        await context.preConditionCheck(data);
        var metadata = {
            external_url: (await window.uploadToIPFS(data.file[0])).split('ipfs://').join('https://ipfs.io/'),
            image: (await window.uploadToIPFS(data.cover[0])).split('ipfs://').join('https://ipfs.io/'),
            name: data.title,
            description: data.description,
            background_color: data.background
        };
        context.view.emit('loader/show');
        var metadataLink = await window.uploadToIPFS(metadata);
        context.view.emit('loader/propagate', [metadataLink, metadata.external_url, metadata.image], async function () {
            var metadataHash = window.web3.utils.sha3(JSON.stringify(metadata));
            var rootId = context.view.state.rootId || 0;
            var value = window.web3.utils.toWei(context.getDonation(data), 'ether');
            value = parseInt(value) === 0 ? undefined : value;
            var onChain = data.onchain === true || data.onchainStandalone === true;
            var chunks = onChain ? await context.readChunks(data.file[0]) : [""];
            var block = await window.web3.eth.getBlockNumber();
            try {
                for (var i in chunks) {
                    context.view.emit('loader/transaction', parseInt(i) + 1, onChain ? chunks.length : 1);
                    if(data.onchain || data.regular) {
                        var result = await window.ethArt.mint(value, metadataLink, metadataHash, onChain ? chunks[i] : '0x', !onChain || parseInt(i) === chunks.length - 1, rootId);
                        if (!rootId) {
                            var logs = await window.ethArt.getPastLogs({ event: "Minted(address_indexed,address,uint256,uint256)", fromBlock: block });
                            rootId = parseInt(logs[0].data[1]);
                        }
                    } else {
                        await window.blockchainCall(window.standaloneToken.methods.mint, value, onChain ? chunks[i] : '0x', metadataLink, rootId, !onChain || parseInt(i) === chunks.length - 1, "0x");
                        if (!rootId) {
                            rootId = (parseInt(window.blockchainCall(window.standaloneToken.methods.totalSupply)) -1);
                        }
                    }
                    if (!onChain) {
                        break;
                    }
                }
            } catch (e) {
                if(!onException) {
                    context.view.emit('loader/hide');
                    throw e;
                }
                return onException(e);
            }
            context.view.emit('loader/hide');
        });
    };

    context.getDonation = function getDonation(data) {
        var keys = Object.keys(data);
        for (var key of keys) {
            if (key.indexOf('donation_') === -1) {
                continue;
            }
            if (data[key]) {
                return key.substring(key.indexOf('_') + 1);
            }
        }
        return 0;
    };

    context.readChunks = function readChunks(file) {
        return new Promise(function (ok, ko) {
            var extension;
            try {
                extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            } catch (e) {
            }
            if (!extension) {
                return ko("Cannot retrieve file extension");
            }
            var reader = new FileReader();
            reader.addEventListener("load", async function () {
                var result = reader.result;
                if(result === '') {
                    return ko("Cannot read " + file.name + ". Maybe it's too large");
                }
                var mimeType;
                try {
                    mimeType = result.substring(5, result.indexOf(";"));
                } catch (e) {
                }
                try {
                    mimeType = mimeType || window.context.supportedFileExtensions[extension];
                } catch (e) {
                }
                if (!mimeType) {
                    return ko("Unsupported file extension (." + extension + ")");
                }
                result = "data:" + mimeType + result.substring(result.indexOf(";"));
                ok(await window.split(result, context.view.state && context.view.state.singleTokenLength, number => {
                    context.view.emit('loader/chunks', number);
                }));
            }, false);
            reader.readAsDataURL(file);
        });
    };

    context.preConditionCheck = async function preConditionCheck(data) {
        var errors = [];

        !data.title && errors.push("Title is mandatory");
        !data.description && errors.push("Description is mandatory");
        !data.background && errors.push("Background color is mandatory");
        (!data.file || data.file.length === 0) && errors.push("Data is mandatory");
        (!data.cover || data.cover.length === 0) && errors.push("Cover is mandatory");
        !data.regular && !data.onchain && !data.regularStandalone && !data.onchainStandalone && errors.push("You must choose the NFT Type");

        data.cover && data.cover.length > 0 && !(await window.checkCoverSize(data.cover[0])) && errors.push("Cover size must be 350x350 px");

        if (errors.length > 0) {
            throw errors.join('\n');
        }
    };
};