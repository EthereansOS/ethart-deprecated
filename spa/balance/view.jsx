var Balance = React.createClass({
    requiredScripts : [
        'spa/loader.jsx'
    ],
    componentDidMount() {
        this.controller.renderItems();
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/ping' : this.controller.renderItems
        }
    },
    renderItem(it) {
        return (<section key={it.key} className="BALANCE-ITEM">
            <figure style= {{backgroundColor: it.background_color}}>
                {it.loading && <Loader/>}
                {!it.loading && <img src={it.name ? (it.image || "/assets/img/missingno.png") : "/assets/img/missingno.png"}/>}
            </figure>
            <section className="ASSET-INFO">
                <p>{it.ticker} #{it.tokenId} - {it.loading ? "Loading..." : it.name ? window.shortenWord(it.name) : "MISSINGNO."}</p>
            </section>
            <section className="ASSET-ACTION">
                <a className="OS" target="_blank" href={it.etherscanLink}>Etherscan</a>
                <a className="OS" target="_blank" href={it.openSeaLink}>OpenSea</a>
            </section>
        </section>);
    },
    render() {
        return (<section className="BALANCE-ITEMS">
            {this.state && this.state.items && Object.values(this.state.items).map(this.renderItem)}
            <section className="BALANCE-LOAD">
                <a className="BALANCE-LOAD-FX" href="javascript:;" onClick={this.controller.renderItems}>Refresh &#8635;</a>
            </section>
        </section>);
    }
});