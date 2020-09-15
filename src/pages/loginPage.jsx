// import component
import React, { Component } from 'react'

class LoginPage extends Component {
    render() {
        return (
            <div style={styles.root}>
                <h1>Login Page</h1>
            </div>
        )
    }
}

const styles = {
    root : {
        marginTop: 50,
        backgroundColor: 'ghostwhite',
        height: '100vh'
    }
}

export default LoginPage