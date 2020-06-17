var Explore = React.createClass({
    componentDidMount() {
        this.controller.renderItems();
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/update' : this.controller.renderItems
        }
    },
    renderItem(it) {
        return (<section key={it.tokenId} className="EXPLORE-ITEM">
            <figure>
                <img src={!it.name ? "assets/img/missingno.png" : window.makeBlockie(it.tokenId + this.state.tokenAddress)}></img>
            </figure>
            <section className="ASSET-INFO">
                <h4>#{it.tokenId} - {it.name ? window.shortenWord(it.name) : "MISSINGNO."}</h4>
                <p>{it.description ? window.shortenWord(it.description, 150) : "No description"}</p>
            </section>
            <section className="ASSET-ACTION">
                <a className="OS" href={this.state.etherscanLink + it.tokenId} target="_blank">Etherscan</a>
                <a className="OS" target="_blank" href={this.state.openSeaLink + it.tokenId}>OpenSea</a>
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
        return (<section className="EXPLORE-ITEMS">
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
        </section>);
    }
});