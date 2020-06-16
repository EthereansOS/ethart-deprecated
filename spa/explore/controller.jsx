var ExploreController = function (view) {
    var context = this;
    context.view = view;

    context.renderItems = async function renderItems() {
        var pageLimit = 5;
        if(!window.ethArt) {
            return setTimeout(()=> context.renderItems(search));
        }
        var search = context.view.searchInput.value;
        search = search === '' ? undefined : parseInt(search);
        context.view.setState({items: null});
        var nextId = await window.ethArt.getUint256('nextId');
        if(nextId <= search) {
            return;
        }
        nextId = isNaN(search) ? nextId : (search + 1);
        var totalSupply = parseInt(await window.ethArt.getUint256('totalSupply'));
        var totalPages = totalSupply / pageLimit;
        totalPages = totalPages <= 0 ? 1 : totalPages;
        totalPages = context.roundUp(totalPages);
        var page = context.view.state && context.view.state.page || 1;
        context.view.setState({page, totalPages});
        var items = {};
        var tokenAddress = await window.ethArt.getAddress('token');
        !context.view.state || !context.view.state.openseaLink && context.view.setState({tokenAddress, openSeaLink : 'https://opensea.io/assets/' + tokenAddress + '/', etherscanLink : window.getNetworkElement('etherscanURL') + 'token/' + tokenAddress + '?a=' });
        var start = isNaN(search) ? 1 : search;
        var end = parseInt(nextId);
        if(isNaN(search)) {
            end = (page * pageLimit) + 1;
            if(end > nextId) {
                end = nextId;
            }
            start = ((page * pageLimit) - pageLimit) + 1;
        }
        for(var tokenId = start; tokenId < end; tokenId++) {
            var item = items[tokenId] = {
                tokenId,
                metadataLink : await window.ethArt.getString(window.toStateHolderKey(tokenId))
            };
            context.view.setState({items});
            var metadata = await window.AJAXRequest(item.metadataLink.split('ipfs://').join('//gateway.ipfs.io/'));
            Object.keys(metadata).forEach(key => item[key] = metadata[key]);
            Object.keys(item).forEach(key => {
                try {
                    item[key] = item[key].split('ipfs://').join('//gateway.ipfs.io/');
                } catch(e) {
                }
            });
            context.view.setState({items});
        }
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