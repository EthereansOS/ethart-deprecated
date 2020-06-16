var Deploy = React.createClass({
    
    render() { return (
        <section>
            <section className="DEPLOY-INFO">
                <input type="radio"></input>
                <label>Regular NFT:</label>
                <p>The most commonly used Standard by storing the file via IPFS (Distributed Network). Cheaper choice, but the file can be forgotten. <a href="https://docs.ipfs.io/concepts/how-ipfs-works/#content-addressing" target="_Blank">More</a></p>
            </section>
            <section className="DEPLOY-INFO">
                <input type="radio"></input>   
                <label>Onchain NFT:</label>
                <p>A decentralized standard by storing the file on-chain via base64. Expensive, but the file is stored perpetually as long as the ethereum network exists.</p>
            </section>
        </section>

    );
    }
});