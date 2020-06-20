var NftFile = React.createClass({
    requiredScripts: [
        'spa/loader.jsx'
    ],
    onChange(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        var _target = e.currentTarget;
        if(_target.files.length === 0) {
            return;
        }
        var _this = this;
        _this.setState({loading : true}, () => _this.emit('deploy/pause'));
        var reader = new FileReader();
        reader.addEventListener("load", async function () {
            reader.result === '' && alert("Cannot read " + _target.files[0].name + ". Maybe it's too large");
            (reader.result === '') && (_target.value = "");
            _this.setState({loading : false}, () => _this.emit('deploy/resume'));
        }, false);
        reader.readAsDataURL(_target.files[0]);
    },
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="data">NFT File:</label>
                <input id="file" onChange={this.onChange} data-mandatory="true" type="file" accept={'.' + Object.keys(window.context.supportedFileExtensions).join(', .')}/>
                {this.state && this.state.loading && <Loader/>}
            </section>
        </section>);
    }
});