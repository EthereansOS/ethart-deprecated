var Balance = React.createClass({
    render() { return (
    <section className="BALANCE-ITEMS">
        <section className="BALANCE-ITEM">
            <figure>
                <img src="/assets/img/BUIDL.png"></img>
            </figure>
            <section className="ASSET-INFO">
                <p>My First NFT</p>
                <a>0x5D40c724ba3e7Ffa6a...</a>
            </section>
            <section className="ASSET-ACTION">
                <a>Send</a>
                <a className="OS">OpenSea</a>
            </section>
        </section>
        <section className="BALANCE-LOAD">
            <a className="BALANCE-LOAD-FX">Refresh &#8635;</a>
        </section>
    </section>
    );
    }
});