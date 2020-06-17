var Loader = React.createClass({
    
    
    
    render() { 
        return (
        <section className="UPLOADBANNER">
            <h1>Uploading...</h1>
            <h1>{counter}</h1>
            <h2>Waiting for Propagation</h2>
            <div class="loadingio-spinner-ripple-6l4nh0xpwdg"><div class="ldio-2it1sjbil3o">
            <div></div><div></div>
            </div></div>
        </section>
        );
    }
});

function Counteripfs() {
    const [counter, setCounter] = React.useState(60);
  
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
    }