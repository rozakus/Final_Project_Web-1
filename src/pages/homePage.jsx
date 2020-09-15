// import component
import React, { Component } from 'react'

class HomePage extends Component {
    render() {
        return (
            <div style={styles.root}>
                <h1>Home Page</h1>
            </div>
        )
    }
}

const styles = {
    root : {
        marginTop: 50,
        // backgroundColor: 'rgb(203,226,214)',
        height: '100vh'
    }
}

export default HomePage