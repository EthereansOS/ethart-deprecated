var NftCover = React.createClass({
    onChange(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        if(e.currentTarget.files.length === 0) {
            return;
        }
        var target = e.currentTarget;
        window.checkCoverSize(target.files[0]).then(result => {
            !result && alert("Cover must be a png of 350x350 px");
            !result && (target.value = '');
        });
    },
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="cover">Cover:</label>
                <input id="cover" data-mandatory="true" accept=".png" type="file" onChange={this.onChange}/>
                <p>A Preview cover for dapps and wallets. <br></br><b>Format: .png | Size (px): 350x350</b></p>
            </section>
            <section className="DEPLOY-INFO">
                <label htmlFor="background">Background:</label>
                <input id="background" data-mandatory="true" type="color"/>
                <p>Background color displayed by dapps and Wallets.</p>
            </section>
        </section>);
    }
});