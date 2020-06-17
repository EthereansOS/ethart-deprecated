var NftFile = React.createClass({
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="data">NFT File:</label>
                <input id="file" data-mandatory="true" type="file" accept={'.' + Object.keys(window.context.supportedFileExtensions).join(', .')}></input>
            </section>
        </section>);
    }
});