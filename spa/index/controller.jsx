var IndexController = function (view) {
    var context = this;
    context.view = view;

    context.upload = async function upload(file) {
        var chunks = await context.readChunks(file);
        var metadata = {
            external_url : await window.DocumentsUploaderProvider.upload(file),
            image : await window.DocumentsUploaderProvider.upload(file)
        };
        var metadataLink = await window.DocumentsUploaderProvider.upload(metadata);
        var metadataHash = window.web3.utils.sha3(JSON.stringify(metadata));
        console.log(metadataLink.split(window.context.ipfsUrlTemplate).join('https://gateway.ipfs.io/ipfs/'), metadataHash, chunks);
        var rootId = context.view.state.rootId || 0;
        var onChain = context.view.state.onChain === true;
        var value = window.web3.utils.toWei('0.001', 'ether');
        var block = await window.web3.eth.getBlockNumber();
        for(var i in chunks) {
            var result = await window.ethArt.mint(value, metadataLink, metadataHash, onChain ? chunks[i] : '0x', i === chunks.length, rootId);
            console.log(result);
            if(!rootId) {
                var logs = await window.ethArt.getPastLogs({event: "Minted(address_indexed,address,uint256,uint256)", fromBlock: block});
                rootId = parseInt(logs[0].data[1]);
            }
            if(!onChain) {
                break;
            }
        }
        console.log(rootId);
    };

    context.readChunks = function(file) {
        return new Promise(function(ok, ko) {
            context.view.setState({ fileName: null, chunks: null }, function () {
                var extension;
                try {
                    extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
                } catch (e) {
                }
                if (!extension) {
                    return ko("Cannot retrieve file extension");
                }
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                    var result = reader.result;
                    var mimeType;
                    try {
                        mimeType = result.substring(5, result.indexOf(";"));
                    } catch(e) {
                    }
                    try {
                        mimeType = mimeType || window.context.supportedFileExtensions[extension];
                    } catch (e) {
                    }
                    if (!mimeType) {
                        return ko("Unsupported file extension (." + extension + ")");
                    }
                    result = "data:" + mimeType + result.substring(result.indexOf(";"));
                    context.view.setState({ fileName: file.name, code: result, chunks: window.split(result, context.view.state && context.view.state.singleTokenLength) }, () => ok(context.view.state.chunks));
                }, false);
                reader.readAsDataURL(file);
            });
        });
    };
};