// import React Component
import React from 'react'

// import library
import Axios from 'axios'

// import UI
import {
    Paper,
    Button,
    Typography,
    CardMedia,
    Fab
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import 
import { URL } from '../actions'

// class component
class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProduct: {},
            selectedQuantity: 0,
            selectedTotal: 0,
            user_id: 2,
        }
    }

    componentDidMount() {
        Axios.get(URL + '/getProduct/' + this.props.location.search.slice(1))
            .then(res => {
                this.setState({ selectedProduct: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    handleMinus = () => {
        if (this.state.selectedQuantity === 0) return null
        this.setState({ selectedQuantity: this.state.selectedQuantity - 1 },
            () => this.setState({ selectedTotal: this.state.selectedQuantity * this.state.selectedProduct.price_sell }))

    }

    handlePlus = () => {
        if (this.state.selectedQuantity === this.state.selectedProduct.product_stock) return null
        this.setState({ selectedQuantity: this.state.selectedQuantity + 1 },
            () => this.setState({ selectedTotal: this.state.selectedQuantity * this.state.selectedProduct.price_sell }))
    }

    handleAddToCart = () => {
        // if (this.state.selectedQuantity === 0 || this.state.selectedTotal === 0) return null

        const body = {
            user_id: this.state.user_id,
            product_id: this.state.selectedProduct.product_id,
            product_qty: this.state.selectedQuantity,
            total: this.state.selectedTotal
        }

        console.log({ body })

        Axios.post(URL + '/addtocartpcs', body)
    }

    render() {
        const { selectedProduct, selectedQuantity } = this.state
        // console.log('props location : ', this.props.location)
        // console.log('selectedProduct', selectedProduct)
        // console.log('selectedQuantity', selectedQuantity)

        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer}>
                    <div style={styles.leftContent}>
                        <CardMedia image={selectedProduct.image} component="img" style={styles.contentImage} />
                    </div>
                    <div style={styles.rightContent}>
                        <Fab style={{ padding: 10, display: 'flex', justifyContent: 'center', borderRadius: 20, marginBottom: 20, width: '100%', backgroundColor: 'blue', color: 'white' }}>
                            <Typography variant='h6'>{selectedProduct.product_name}</Typography>
                        </Fab>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                            <Typography>Price : Rp {selectedProduct.price_sell}, 00</Typography>
                            <Typography>Stock : {selectedProduct.product_stock}</Typography>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' style={{ backgroundColor: 'blue', color: 'white', borderRadius: 20 }} onClick={this.handleMinus}>-</Button>
                            <Button>{selectedQuantity}</Button>
                            <Button variant='contained' style={{ backgroundColor: 'blue', color: 'white', borderRadius: 20, marginRight: 20 }} onClick={this.handlePlus}>+</Button>
                            <Button
                                onClick={this.handleAddToCart}
                                variant='contained'
                                style={{ backgroundColor: 'yellow', borderRadius: 20 }}
                                startIcon={<ShoppingCartIcon />}
                            >Add to Cart</Button>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    rootContainer: {
        width: '60%',
        height: '60%',
        padding: 10,
        borderRadius: 20,
        display: 'flex',
        // backgroundColor: 'yellow',
    },
    leftContent: {
        width: '30%',
        height: '100%',
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 10
    },
    contentImage: {
        maxWidth: 300,
        maxHeight: '100%',
        padding: '5%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    rightContent: {
        display: 'flex',
        flex: 1,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'column',
        // backgroundColor: 'whitesmoke',
    }
}

export default ProductDetails