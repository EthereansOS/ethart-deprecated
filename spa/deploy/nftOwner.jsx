var NftOwner = React.createClass({
    validate() {
        var data = window.getData(this.domRoot);
        if(!data.dfo && !data.standalone) {
            throw "Please select the Ownership model";
        }
    },
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <input id="dfo" name="type" type="radio" value="regular"/>
                <label htmlFor="dfo">(ARTE)Co-Ownership:</label>
                <p>You can mint this NFT in co-ownership with the Ethart Bank, receiving 100 ARTE and becoming an owner of the bank. <a href="https://github.com/b-u-i-d-l/ethArt">more</a></p>
            </section>
            <section className="DEPLOY-INFO">
                <input id="standalone" name="type" type="radio" value="onchain"/>
                <label htmlFor="standalone">(ETRA)Standalone:</label>
                <p>You have the full ownership of your NFT, and cheaper ETH fees to create it, but without any participation in the Ethart Bank.</p>
            </section>
        </section>);
    }
});