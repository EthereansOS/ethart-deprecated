var LoaderIPFS = React.createClass({
  getDefaultSubscriptions() {
    return {
      'loader/show' : () => this.setState({propagate : false}, () => this.domRoot.css('display', 'block')),
      'loader/propagate': this.propagate,
      'loader/hide' : this.hideLoader
    }
  },
  getInitialState() {
    return {
      counter: 60
    };
  },
  propagate(link, callback) {
    var _this = this;
    link && window.AJAXRequest(link.split('ipfs://').join('//gateway.ipfs.io/'));
    var myInterval = function interval() {
      if (_this.state.counter === 0) {
        return _this.hideLoader(callback);
      }
      _this.setState({ counter: _this.state.counter - 1 });
    };
    _this.interval && clearInterval(_this.interval);
    _this.setState({ counter: 60, propagate: true }, function () {
      _this.domRoot.css('display', 'block');
      _this.interval = setInterval(myInterval, 1000);
    });
  },
  hideLoader(callback) {
    this.interval && clearInterval(this.interval);
    this.domRoot.css('display', 'none');
    this.setState({propagate: false});
    callback && callback();
  },
  render() {
    return (<section className="UPLOADBANNER">
      {!this.state.propagate && <h1>Uploading...</h1>}
      {this.state.propagate && <h1>{this.state.counter}</h1>}
      {this.state.propagate && <h2>Waiting for Propagation</h2>}
      <div class="loadingio-spinner-ripple-6l4nh0xpwdg"><div class="ldio-2it1sjbil3o">
        <div></div><div></div>
      </div></div>
    </section>);
  }
});