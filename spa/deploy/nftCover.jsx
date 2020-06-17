var NftCover = React.createClass({
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="cover">Cover:</label>
                <input id="cover" accept=".png" type="file"/>
                <p>A Preview cover for dapps and wallets. <br></br><b>Format: .png | Size (px): 350x350</b></p>
            </section>
            <section className="DEPLOY-INFO">
                <label htmlFor="background">Background:</label>
                <input id="background" type="color" ref={ref => ref && (ref.value = "#8f00ff")}/>
                <p>Background color displayed by dapps and Wallets.</p>
            </section>
        </section>);
    }
});