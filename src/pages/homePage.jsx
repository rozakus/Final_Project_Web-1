// import component
import React, { Component } from 'react'

// import Component
import Products from '../components/products'
import ProductPackage from '../components/productPackage'

// import
import Wallpaper from '../assets/images/Wallpaper.jpg'

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
        paddingTop: 80,
        backgroundImage: `url(${Wallpaper})`,
        height: 'auto'
    }
}

export default HomePage