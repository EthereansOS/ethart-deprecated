var Index = React.createClass({
    requiredModules:[
        "spa/deploy",
        "spa/balance",
        "spa/explore"
    ],
    onChange(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        this.emit('loader/toggle', true);
        var _this = this;
        this.controller.upload(e.target.files[0]).catch(e => alert(e.message || e)).then(() => _this.emit('loader/toggle', false));
    },
    render() { 
        var _this = this;
        return (
    <section>
        <section className="HEADER">
            <h1><img src="/assets/img/ethart-logo.png"></img><span className="LOGO-Y-2"><span className="LOGO-P">e</span>th</span><aspan className="LOGO-Pi">ar</aspan><span className="LOGO-G">t</span></h1>
            <section className="WALLET">
                {!window.walletAddress && window.ethereum && window.ethereum.enable && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => _this.forceUpdate()).catch(() => {})}>Connect your wallet</a>}
                {window.walletAddress && <a href="javascript:;">{window.walletAddress.substring(0, 9)}..</a>}
                {window.walletAddress && <figure>
                    <img src={window.makeBlockie(window.walletAddress)}></img>
                </figure>}
            </section>
        </section>
        <section className="MANAGE">
            <section className="SMALL-BOX">
                <section className="shadowP shadowP1"></section>
                <section className="shadowP shadowP2"></section>
                <section className="shadowP shadowP3"></section>
                <section className="SMALL-MENU SMALL-MENU-P">
                    <h3>Create NFT <a href="http://erc721.org/" target="_Blank">erc721</a></h3>
                    <Deploy/>
                </section>
            </section>
            <section className="SMALL-BOX">
                <section className="shadowG shadowG1"></section>
                <section className="shadowG shadowG2"></section>
                <section className="shadowG shadowG3"></section>
                <section className="SMALL-MENU SMALL-MENU-G">
                    <h3>Your NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
                    <Balance/>
                </section>
            </section>
        </section>
        <section className="EXPLORE">
            <section className="HUGE-BOX">
                    <section className="shadowPi shadowPi1"></section>
                    <section className="shadowPi shadowPi2"></section>
                    <section className="shadowPi shadowPi3"></section>
                    <section className="HUGE-MENU HUGE-MENU-Pi">
                        <h3>Explore NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
                        <Explore/>
                    </section>
            </section>
        </section>
        <footer>
            <h4>Made with ❤️ by the <a href="https://dfohub.com" target="_Blank">DFOhub</a> team for Etherean Artists.</h4>
        </footer>
    </section>
    );
    }
    });