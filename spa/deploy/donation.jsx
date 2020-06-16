var Donation = React.createClass({
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label>Donation:</label>
                <section className="DEPLOY-DONATIONS">
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_1"/>
                        <aside>&#128123; 1 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_0.1"/>
                        <aside>&#128525; 0.1 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_0.01"/>
                        <aside>&#128526; 0.01 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_0.005"/>
                        <aside>&#128578; 0.005 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_0.001"/>
                        <aside>&#128579; 0.001 ETH</aside>
                    </section>
                    <section className="DEPLOY-DONATION">
                        <input name="donation" type="radio" id="donation_0"/>
                        <aside>&#128577; Nope!</aside>
                    </section>
                </section>
                <p><b>No fees here!</b> You only have to pay the Ethereum GAS. if you want to &#128591; us, you can donate to <a href="https://dfohub.com" target="_Blank">DFOhub</a> for more R&D and fancy updates</p>
            </section>
        </section>);
    }
});