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
        this.data = this.data || {};
        var data = window.getData(this.currentPage.domRoot);
        Object.keys(data).forEach(key => this.data[key] = data[key]);
        return this.data;
    },
    deploy(e) {
        e && e.preventDefault && e.preventDefault() && e.stopPropagation && e.stopPropagation();
        this.emit('loader/toggle', true);
        var _this = this;
        this.controller.deploy(this.dumpData()).catch(e => alert(e.message || e)).then(() => _this.emit('loader/toggle', false));
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
            <section className="DEPLOY-ACTION">
                {window.React.createElement(this.requiredScripts[this.state.page].split('spa/deploy/').join('').split('.jsx').join('').firstLetterToUpperCase(), {ref : ref => this.currentPage = ref})}
                {this.state.page > 0 && <a href="javascript:;" onClick={() => this.changePage(-1)} className="deploy-btn">prev</a>}
                {this.state.page < this.requiredScripts.length - 1 && <a href="javascript:;" onClick={() => this.changePage(1)} className="deploy-btn">next</a>}
                {this.state.page === this.requiredScripts.length - 1 && <a href="javascript:;" onClick={() => this.deploy()} className="deploy-btn">deploy</a>}
            </section>
        </section>);
    }
});