var NftType = React.createClass({
    validate() {
        var data = window.getData(this.domRoot);
        if(!data.regular && !data.onchain && !data.regularStandalone && !data.onchainStandalone) {
            throw "You must choose the NFT Type";
        }
    },
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <input id="regular" name="type" type="radio" value="regular"/>
                <label htmlFor="regular">Regular NFT:</label>
                <p>Commonly used Standard by storing the file via IPFS. Cheaper, but the file can be forgotten. <a href="https://docs.ipfs.io/concepts/how-ipfs-works/#content-addressing" target="_Blank">More</a></p>
            </section>
            <section className="DEPLOY-INFO">
                <input id="onchain" name="type" type="radio" value="onchain"/>
                <label htmlFor="onchain">Onchain NFT:</label>
                <p>A decentralized standard by storing the file on-chain. Expensive, but the file is stored perpetually as long as the ethereum network exists.</p>
            </section>
        </section>);
    }
});