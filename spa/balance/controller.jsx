var BalanceController = function (view) {
    var context = this;
    context.view = view;

    context.renderItems = async function renderItems() {
        if(!window.ethArt) {
            return setTimeout(context.renderItems);
        }
        context.view.setState({items: null});
        var balance = await window.ethArt.getUint256(window.toStateHolderKey(window.walletAddress, 'balance'));
        var items = (context.view.state && context.view.state.items) || {};
        var tokenAddress = await window.ethArt.getAddress('token');
        !context.view.state || !context.view.state.openseaLink && context.view.setState({tokenAddress, openSeaLink : 'https://opensea.io/assets/' + tokenAddress + '/', etherscanLink : window.getNetworkElement('etherscanURL') + 'token/' + tokenAddress + '?a=' });
        for(var i = 0; i < balance; i++) {
            var tokenId = await window.ethArt.getUint256(window.toStateHolderKey(window.walletAddress, i));
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
};