var NftCover = React.createClass({
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="cover">Cover:</label>
                <input id="cover" accepts="png" type="file"/>
                <p>A Preview cover (Standard for applications and wallets) <b>Format: .png | Size (px): 350x350</b></p>
            </section>
            <section className="DEPLOY-INFO">
                <label htmlFor="background">Background:</label>
                <input id="background" type="color" ref={ref => ref && (ref.value = "#8f00ff")}/>
                <p>A background color displayed by Applications and Wallets if the Cover has transparent pixels</p>
            </section>
        </section>);
    }
});