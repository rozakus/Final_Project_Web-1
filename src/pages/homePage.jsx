// import component
import React, { Component } from 'react'

// import Component
import Products from '../components/products'
import ProductPackage from '../components/productPackage'

class HomePage extends Component {
    render() {
        console.log('props location : ', this.props.location)

        return (
            <div style={styles.root}>
                <ProductPackage />
                <Products />
            </div>
        )
    }
}

const styles = {
    root: {
        marginTop: 50,
        // backgroundColor: 'rgb(203,226,214)',
        height: 'auto'
    }
}

export default HomePage