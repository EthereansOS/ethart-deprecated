var Index = React.createClass({
    requiredModules:[
        "spa/deploy"
    ],
    render() { return (
    <section>
        <section className="DEPLOY-HEADER">
            <h1>&#127912; eth<span>Art</span></h1>
            <h2>Made with ❤️ by the <a href="https://dfohub.com" target="_Blank">DFOhub</a> team for Etherean Artists.</h2>
            <section className="DEPLOY-MENU">
            <h3>Create NFTs <a href="http://erc721.org/" target="_Blank">erc721</a></h3>
            <Deploy/>
            <section class="DEPLOY-ITEM DEPLOY-ITEM-end">
                    <a className="deploy-btn">Deploy</a>
            </section>
            </section>
            <section className="DEPLOY-MENU">
            <h3>Search NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
            <section class="DEPLOY-ITEM DEPLOY-ITEM-end">
            </section>
            </section>
            <section className="DEPLOY-MENU">
            <h3>Your NFTs <a href="http://erc721.org/" target="_Blank"></a></h3>
            <section class="DEPLOY-ITEM DEPLOY-ITEM-end">
            </section>
            </section>
        </section>
        <aside>
            <h4>Made with ❤️ by the <a href="https://dfohub.com" target="_Blank">DFOhub</a> team for Etherean Artists.</h4>
        </aside>
    </section>
    );
    }
    });