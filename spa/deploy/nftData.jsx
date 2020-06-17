var NftData = React.createClass({
    render() {
        return (<section>
            <section className="DEPLOY-INFO">
                <label htmlFor="title">Title:</label>
                <input id="title" data-mandatory="true" type="text"></input>
            </section>
            <section className="DEPLOY-INFO">
                <label htmlFor="description">Description:</label>
                <textarea id="description" data-mandatory="true" type="text"></textarea>
            </section>
        </section>);
    }
});