// import React Component
import React from 'react'

// import library
import Axios from 'axios'

// import UI
import { Paper, Button, Typography } from '@material-ui/core'

// import 
import { URL } from '../actions'

// class component
class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProduct: {}
        }
    }

    componentDidMount() {
        Axios.get(URL + '/getProduct/' + this.props.location.search.slice(1))
            .then(res => {
                this.setState({ selectedProduct: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    componentDidUpdate() {
        console.log(this.state.selectedProduct)
    }

    render() {
        // console.log('props location : ', this.props.location)
        const { selectedProduct } = this.state
        return (
            <div style={styles.root}>
                <Typography>product details</Typography>
                <Typography>{selectedProduct.product_name}</Typography>
                <Typography>{selectedProduct.price_sell}</Typography>
            </div>
        )
    }
}

const styles = {
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
}

export default ProductDetails