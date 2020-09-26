// import React Component
import React from 'react'

// import library
import Axios from 'axios'
import { Link, Redirect } from "react-router-dom"

// import UI
import {
    Paper,
    Button,
    Typography,
    CardMedia,
    Fab,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    // DialogTitle
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import
import Wallpaper from '../assets/images/Wallpaper.jpg'

// import 
import { URL } from '../actions'

// class component
class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProduct: {},
            selectedQuantity: 0,
            total_sell: 0,
            total_modal: 0,
            alertLogin: false,
            directToCart: false
        }
    }

    componentDidMount() {
        Axios.get(URL + '/getProduct/' + this.props.location.search.slice(1))
            .then(res => {
                this.setState({ selectedProduct: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    handleMinus = async () => {
        if (this.state.selectedQuantity === 0) return null
        await this.setState({ selectedQuantity: this.state.selectedQuantity - 1 })
        await this.setState({ total_sell: this.state.selectedQuantity * this.state.selectedProduct.price_sell })
        await this.setState({ total_modal: this.state.selectedQuantity * this.state.selectedProduct.price_modal })
    }

    handlePlus = async () => {
        if (this.state.selectedQuantity === this.state.selectedProduct.product_stock) return null
        await this.setState({ selectedQuantity: this.state.selectedQuantity + 1 })
        await this.setState({ total_sell: this.state.selectedQuantity * this.state.selectedProduct.price_sell })
        await this.setState({ total_modal: this.state.selectedQuantity * this.state.selectedProduct.price_modal })
    }

    handleAddToCart = async () => {
        // if (this.state.selectedQuantity === 0 || this.state.selectedTotal === 0) return null
        if (localStorage.getItem('id') === null) return this.setState({ alertLogin: true })
        if (!this.state.selectedQuantity || !this.state.total_modal || !this.state.total_sell) return console.log('please order')

        const body = {
            user_id: parseInt(localStorage.getItem('id')),
            product_id: this.state.selectedProduct.product_id,
            product_qty: this.state.selectedQuantity,
            total_modal: this.state.total_modal,
            total_sell: this.state.total_sell
        }

        console.log({ body })

        Axios.post(URL + '/addtocartpcs', body)
        await this.setState({ selectedQuantity: 0 })
        await this.setState({ total_sell: 0 })
        await this.setState({ total_modal: 0 })
        await this.setState({ directToCart: true })
    }

    handleClose = () => { this.setState({ alertLogin: false }) }

    render() {
        const { selectedProduct, selectedQuantity, alertLogin, directToCart } = this.state
        // console.log('props location : ', this.props.location)
        // console.log('selectedProduct', selectedProduct)
        // console.log('selectedQuantity', selectedQuantity)
        // console.log('total_sell', this.state.total_sell)
        // console.log('total_modal', this.state.total_modal)

        if (directToCart) return <Redirect to='/cart' />

        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer} elevation={5}>
                    <div style={styles.leftContent}>
                        <CardMedia image={selectedProduct.image} component="img" style={styles.contentImage} />
                    </div>
                    <div style={styles.rightContent}>
                        <Fab style={{ padding: 10, display: 'flex', justifyContent: 'center', borderRadius: 20, marginBottom: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black' }}>
                            <Typography variant='h6'>{selectedProduct.product_name}</Typography>
                        </Fab>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 10 }}>
                            <Table size="small" style={{ width: '50%' }}>
                                <TableBody>
                                    <TableRow><TableCell /><TableCell /></TableRow>
                                    <TableRow>
                                        <TableCell style={{ borderBottom: "none" }}>Price</TableCell>
                                        <TableCell style={{ borderBottom: "none" }} align="right">{selectedProduct.price_sell}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Stock</TableCell>
                                        <TableCell align="right">{selectedProduct.product_stock}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ borderBottom: "none", color: 'red' }}>Total Price</TableCell>
                                        <TableCell style={{ borderBottom: "none", color: 'red' }} align="right">{`IDR ${this.state.total_sell.toLocaleString()}.00`}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' style={{ backgroundColor: '#cbe2d6', borderRadius: 20 }} onClick={this.handleMinus}>-</Button>
                            <Button>{selectedQuantity}</Button>
                            <Button variant='contained' style={{ backgroundColor: '#cbe2d6', borderRadius: 20, marginRight: 20 }} onClick={this.handlePlus}>+</Button>
                            <Button
                                onClick={this.handleAddToCart}
                                variant='contained'
                                style={{ backgroundColor: '#cbe2d6', borderRadius: 20 }}
                                startIcon={<ShoppingCartIcon />}
                            >Add to Cart</Button>
                        </div>
                    </div>
                </Paper>
                <Dialog
                    open={alertLogin}
                    onClose={this.handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            Your're not login yet. please login to order.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to='/login'>
                            <Button>login</Button>
                        </Link>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const styles = {
    root: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${Wallpaper})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    rootContainer: {
        width: '60%',
        height: '60%',
        padding: 10,
        borderRadius: 20,
        display: 'flex',
        // backgroundColor: 'whitesmoke',
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