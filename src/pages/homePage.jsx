// import component
import React, { Component } from 'react'

// import Component
import Products from '../components/products'

class HomePage extends Component {
    render() {
        return (
            <div style={styles.root}>
                <Products />
            </div>
        )
    }
}

const styles = {
    root: {
        marginTop: 50,
        // backgroundColor: 'rgb(203,226,214)',
        height: '100vh'
    }
}

export default HomePage