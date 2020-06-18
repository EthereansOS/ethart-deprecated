var Deploy = React.createClass({
    requiredScripts: [
        'spa/deploy/nftData.jsx',
        'spa/deploy/nftCover.jsx',
        'spa/deploy/nftType.jsx',
        'spa/deploy/nftFile.jsx',
        'spa/deploy/donation.jsx'
    ],
    getInitialState() {
        return {
            page : 0
        };
    },
    dumpData() {
        try {
            this.currentPage.validate && this.currentPage.validate();
            this.data = this.data || {"donation_0.005" : true, background : "#8f00ff"};
            var data = window.getData(this.currentPage.domRoot);
            Object.keys(data).forEach(key => this.data[key] = data[key]);
            return this.data;
        } catch(e) {
            alert(e.message || e);
            throw e;
        }
    },
    deploy(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        this.emit('loader/show');
        var _this = this;
        var onException = function onException(e) {
            alert(e.message || e);
            _this.emit('loader/hide');
        };
        try {
            this.controller.deploy(this.dumpData(), onException).catch(onException);
        } catch(e) {
            return onException(e);
        }
    },
    changePage(num) {
        num > 0 && this.dumpData();
        var _this = this;
        var page = this.state.page;
        page += num;
        page = page < 0 ? 0 : page >= this.requiredScripts.length ? this.requiredScripts.length - 1 : page;
        this.setState({page}, function() {
            window.setData(_this.currentPage.domRoot, _this.data);
        });
    },
    render() {
        return (<section className="DEPLOY-ITEM">
            {window.React.createElement(this.requiredScripts[this.state.page].split('spa/deploy/').join('').split('.jsx').join('').firstLetterToUpperCase(), {ref : ref => this.currentPage = ref})}
            <section className="DEPLOY-ACTION">
                {this.state.page > 0 && <a href="javascript:;" onClick={() => this.changePage(-1)} className="deploy-btn">prev</a>}
                {this.state.page < this.requiredScripts.length - 1 && <a href="javascript:;" onClick={() => this.changePage(1)} className="deploy-btn">next</a>}
                {this.state.page === this.requiredScripts.length - 1 && <a href="javascript:;" onClick={this.deploy} className="deploy-btn">deploy</a>}
            </section>
        </section>);
    }
});