var Deploy = React.createClass({
    
    render() { return (
        <section>
            <section className="DEPLOY-INFO">
                <label>Donation:</label>
                <section className="DEPLOY-DONATIONS">
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128123; 1 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128525; 0.1 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128526; 0.01 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128578; 0.005 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128579; 0.001 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input type="radio"></input>
                        <aside>&#128577; Nope!</aside>
                    </section>
                </section>
                <p><b>No fees here!</b> You only have to pay the Ethereum GAS. if you want to &#128591; us, you can donate to <a href="https://dfohub.com" target="_Blank">DFOhub</a> for more R&D and fancy updates</p>
            </section>
        </section>
    );
    }
});