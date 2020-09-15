// import component
import React, { Component } from 'react'

class CartPage extends Component {
    render() {
        return (
            <div style={styles.root}>
                <h1>Cart Page</h1>
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

export default CartPage