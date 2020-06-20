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
                <input id="regularStandalone" name="type" type="radio" value="regular"/>
                <label htmlFor="regularStandalone">Co-Ownership:</label>
                <p>You can mint this NFT in co-ownership with the Ethart Bank, receiving 100 ARTE and becoming an owner of the bank. <a href="https://github.com/b-u-i-d-l/ethArt">more</a></p>
            </section>
            <section className="DEPLOY-INFO">
                <input id="onchainStandalone" name="type" type="radio" value="onchain"/>
                <label htmlFor="onchainStandalone">Standalone</label>
                <p>You have the full ownership of your NFT, and cheaper ETH fees to create it, but without any participation in the Ethart Bank.</p>
            </section>
        </section>);
    }
});