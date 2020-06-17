var Index = React.createClass({
    requiredModules: [
        "spa/deploy",
        "spa/balance",
        "spa/explore"
    ],
    render() {
        var _this = this;
        return (<section>
            <section className="HEADER">
                <h1><img src="/assets/img/ethart-logo.png"></img><span className="LOGO-Y-2"><span className="LOGO-P">e</span>th</span><aspan className="LOGO-Pi">ar</aspan><span className="LOGO-G">t</span></h1>
                <section className="WALLET">
                    {!window.walletAddress && window.ethereum && window.ethereum.enable && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => _this.forceUpdate()).catch(() => { })}>Connect</a>}
                    {window.walletAddress && <a href={window.getNetworkElement('etherscanURL') + 'address/' + window.walletAddress} target="_blank">{window.shortenWord(window.walletAddress, 7)}..</a>}
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
                        <Deploy />
                    </section>
                </section>
                <section className="SMALL-BOX">
                    <section className="shadowG shadowG1"></section>
                    <section className="shadowG shadowG2"></section>
                    <section className="shadowG shadowG3"></section>
                    <section className="SMALL-MENU SMALL-MENU-G">
                        <h3>Your NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
                        <Balance />
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
                        <Explore />
                    </section>
                </section>
            </section>
            <footer>
                <h4>Made with ❤️ by the <a href="https://dfohub.com" target="_Blank">DFOhub</a> team for Etherean Artists, you can verify the code you're running <a href="https://b-u-i-d-l.github.io/dfo-hub/?addr=0x4A08d087817Fa803ef3E0B4E17D7856692F5d68D" target="_Blank">here</a> and the R&D repo <a href="https://github.com/b-u-i-d-l/ethArt" target="_Blank">here</a></h4>
                <p className="DISCLAMER">Every on-chain file is available to everyone, be careful to don't transact personal data. Ethereum and IPFS power everything here. Whatever action you take, you have full responsibility.</p>
            </footer>
        </section>);
    }
});