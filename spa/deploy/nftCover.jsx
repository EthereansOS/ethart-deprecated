var Deploy = React.createClass({
    
    render() { return (
        <section>
            <section className="DEPLOY-INFO">
                <label>Cover:</label>
                <input type="file"></input>
                <p>A Preview cover (Standard for applications and wallets) <b>Format: .png | Size (px): 320x320</b></p>
            </section>
            <section className="DEPLOY-INFO"> 
                <label>Background:</label>
                <input value="#8f00ff" type="color"></input>
                <p>A background color displayed by Applications and Wallets if the Cover has transparent pixels</p>
            </section>
        </section>
    );
    }
});