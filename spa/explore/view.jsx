var Explore = React.createClass({
    requiredScripts : [
        'spa/loader.jsx'
    ],
    componentDidMount() {
        this.controller.renderItems();
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/update' : this.controller.renderItems
        }
    },
    renderItem(it) {
        return (<section key={it.key} className="EXPLORE-ITEM">
            <figure>
                {it.loading && <Loader/>}
                {!it.loading && <img src={!it.name ? "assets/img/missingno.png" : window.makeBlockie(it.tokenId + it.tokenAddress)}/>}
            </figure>
            <section className="ASSET-INFO">
                <h4>{it.ticker} #{it.tokenId} - {it.loading ? "Loading..." : it.name ? window.shortenWord(it.name) : "MISSINGNO."}</h4>
                <p>{it.description ? window.shortenWord(it.description, 150) : "No description"}</p>
            </section>
            <section className="ASSET-ACTION">
                <a className="OS" href={it.etherscanLink} target="_blank">Etherscan</a>
                <a className="OS" target="_blank" href={it.openSeaLink}>OpenSea</a>
            </section>
        </section>);
    },
    onSearch(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.searchTimeout && window.clearTimeout(this.searchTimeout);
        this.searchTimeout = window.setTimeout(this.controller.renderItems, 500);
    },
    changePage(num) {
        var page = this.state && this.state.page || 1;
        page+= num;
        page = page <= 0 ? 1 : page > this.state.totalPages ? this.state.totalPages : page;
        this.setState({page}, this.controller.renderItems);
    },
    render() {
        return (<section className={this.props.className}>
            <section className="EXPLORE">
            <section className="HUGE-BOX">
                <section className="shadowPi shadowPi1"></section>
                <section className="shadowPi shadowPi2"></section>
                <section className="shadowPi shadowPi3"></section>
                <section className="HUGE-MENU HUGE-MENU-Pi">
                    <h3>Explore {this.props.className} NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
                        <section className="EXPLORE-ITEMS">
                            <section className="EXPLORE-SEARCH">
                                <input ref={ref => this.searchInput = ref} type="search" onChange={this.onSearch}/>
                                <a href="javascript:;" onClick={this.controller.renderItems}>search</a>
                            </section>
                                {this.state && this.state.items && Object.values(this.state.items).map(this.renderItem)}
                                {(!this.searchInput || this.searchInput.value === '') && this.state && this.state.totalPages && this.state.totalPages !== 1 &&<section className="ASSET-PAGE">
                                    {this.state && this.state.page > 1 && <a href="javascript:;" onClick={() => this.changePage(-1)}>&#8592;</a>}
                                    <p>Page {this.state.page} of {this.state.totalPages}</p>
                                    {this.state && this.state.page < this.state.totalPages && <a href="javascript:;" onClick={() => this.changePage(1)}>&#8594;</a>}
                            </section>}
                        </section>
                    </section>
                </section>
            </section>        
        </section>);
    }
});