var NftCover = React.createClass({
    requiredScripts: [
        'spa/loader.jsx'
    ],
    onChange(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        if(e.currentTarget.files.length === 0) {
            return;
        }
        var target = e.currentTarget;
        var _this = this;
        _this.setState({loading : true}, () => _this.emit('deploy/pause'));
        window.checkCoverSize(target.files[0]).then(result => {
            !result && alert("Cover must be a png of 350x350 px");
            !result && (target.value = '');
            _this.setState({loading : false}, () => _this.emit('deploy/resume'));
        });
    },
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="cover">Cover:</label>
                <input id="cover" data-mandatory="true" accept=".png" type="file" onChange={this.onChange}/>
                <p>A Preview cover for dapps and wallets. <br></br><b>Format: .png | Size (px): 350x350</b></p>
                {this.state && this.state.loading && <Loader/>}
            </section>
            <section className="DEPLOY-INFO">
                <label htmlFor="background">Background:</label>
                <input id="background" data-mandatory="true" type="color"/>
                <p>Background color displayed by dapps and Wallets.</p>
            </section>
        </section>);
    }
});