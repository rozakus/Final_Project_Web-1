import React from 'react'

class HistoryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={styles.root}>
            <h1>history user page</h1>
            </div>
         );
    }
}

const styles = {
    root : {
        marginTop: 100
    }
}
 
export default HistoryUser;