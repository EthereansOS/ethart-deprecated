var ExploreController = function (view) {
    var context = this;
    context.view = view;

    context.renderItems = async function renderItems(view) {
        if(!window.ethArtToken) {
            return setTimeout(()=> context.renderItems(view));
        }
        var token = window[view.props.token + "Token"];
        var pages = await context.renderPages(view, token);
        var items = {};
        context.renderItemsOfToken(view, token, items, pages.start, pages.end);
    };

    context.renderItemsOfToken = async function renderItemsOfToken(view, token, items, start, end) {
        var tokenAddress = token.options.address;
        var ticker = await window.blockchainCall(token.methods.symbol);
        var totalSupply = parseInt(await window.blockchainCall(token.methods.totalSupply));
        if(start >= totalSupply) {
            return;
        }
        end = end > (totalSupply + 1) ? totalSupply + 1 : end;
        for(var tokenId = start; tokenId < end; tokenId++) {
            var item = items[tokenId + "_" + tokenAddress] = {
                key: tokenId + "_" + tokenAddress,
                tokenId,
                metadataLink : await window.blockchainCall(token.methods.tokenURI, tokenId),
                openSeaLink : window.context.openSeaURL + tokenAddress + '/' + tokenId,
                etherscanLink : window.getNetworkElement('etherscanURL') + 'token/' + tokenAddress + '?a=' + tokenId,
                tokenAddress,
                ticker,
                loading: true
            };
            view.setState({items});
            var metadata = await window.AJAXRequest(item.metadataLink.split('ipfs://').join('//gateway.ipfs.io/'));
            Object.keys(metadata).forEach(key => item[key] = metadata[key]);
            Object.keys(item).forEach(key => {
                try {
                    item[key] = item[key].split('ipfs://').join('//gateway.ipfs.io/');
                } catch(e) {
                }
            });
            delete item.loading;
            view.setState({items});
        }
    };

    context.renderPages = async function renderPages(view, token) {
        var search = view.searchInput.value;
        search = search === '' ? undefined : parseInt(search);
        view.setState({items: null});
        var nextId = window.numberToString(parseInt(await window.blockchainCall(token.methods.totalSupply)) + 1);
        if(nextId <= search) {
            return;
        }
        nextId = isNaN(search) ? nextId : (search + 1);
        var totalSupply = parseInt(nextId) - 1;
        var totalPages = totalSupply / window.context.explorePageLimit;
        totalPages = totalPages <= 0 ? 1 : totalPages;
        totalPages = context.roundUp(totalPages);
        var page = view.state && view.state.page || 1;
        view.setState({page, totalPages});

        var start = isNaN(search) ? 1 : search;
        var end = parseInt(nextId);
        if(isNaN(search)) {
            end = (page * window.context.explorePageLimit) + 1;
            if(end > nextId) {
                end = nextId;
            }
            start = ((page * window.context.explorePageLimit) - window.context.explorePageLimit) + 1;
        }
        return {start, end};
    };

    context.roundUp = function roundUp(supply) {
        var data = window.numberToString(supply);
        if(data.indexOf('.') === -1) {
            return supply;
        }
        var second = parseFloat('0' + data.substring(data.indexOf('.')));
        second = second > 0 ? 1 : 0;
        return parseInt(data) + second;
    };
};