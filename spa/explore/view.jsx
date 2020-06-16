var Explore = React.createClass({
    render() { return (
    <section className="EXPLORE-ITEMS">
        <section className="EXPLORE-SEARCH">
            <input type="search"></input>
            <a>search</a>
        </section>
        <section className="EXPLORE-ITEM">
            <figure>
                <img src=""></img>
            </figure>
            <section className="ASSET-INFO">
                <h4>My First NFT</h4>
                <p>For full details on the benefits of Uniswap V2 for liquidity providers and traders, please read the Uniswap V2 announcement blog post. <a>more</a></p>
                <a></a>
            </section>
            <section className="ASSET-ACTION">
                <a>Etherscan</a>
                <a className="OS">OpenSea</a>
            </section>
        </section>
        <section className="ASSET-PAGE">
            <a>&#8592;</a>
            <p>Page 1 of 10</p>
            <a>&#8594;</a>
        </section>
    </section>
    );
    }
});