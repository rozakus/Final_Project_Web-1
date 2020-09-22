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
    Fab,
    Checkbox,
    FormControlLabel
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import 
import { URL } from '../actions'

// class component
class ProductPackageDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProductPackage: [],
            check: [false, false, false],
            quantity: [0, 0, 0],
        }
    }

    componentDidMount() {
        Axios.get(URL + '/getPackage/' + this.props.location.search.slice(1))
            .then(res => {
                this.setState({ selectedProductPackage: res.data })
                // console.log('selectedProductPackage : ', this.state.selectedProductPackage)
            })
            .catch(err => console.log(err))
    }

    // handling
    handleCheck = (e) => {
        console.log('cek', this.state.check)
        console.log('target name :', e.target.name)
        const tempCheck = { ...this.state.check }
        tempCheck[e.target.name] = e.target.checked

        this.setState({ check: tempCheck }, () => { })
    }

    handleAddToCart = () => {
        console.log('add to cart')
    }

    handleQuantityPlus = (indexPackage, indexQuantity) => {
        const tempQuantity = { ...this.state.quantity }

        if (tempQuantity[indexQuantity] >= this.state.selectedProductPackage[indexPackage].max_qty) return null

        tempQuantity[indexQuantity] = tempQuantity[indexQuantity] + 1
        this.setState({ quantity: tempQuantity }, () => { })
    }

    handleQuantityMinus = (indexPackage, indexQuantity) => {
        const tempQuantity = { ...this.state.quantity }

        if (tempQuantity[indexQuantity] === 0) return null
        tempQuantity[indexQuantity] = tempQuantity[indexQuantity] - 1
        this.setState({ quantity: tempQuantity }, () => { })
    }

    renderSelectProductPackage = () => {
        const { selectedProductPackage, check, quantity } = this.state
        return (
            <div style={{ display: 'flex', width: '100%' }}>
                <FormControlLabel
                    control={<Checkbox checked={check[0]} name={'0'} onChange={(e) => this.handleCheck(e)} />}
                    label={selectedProductPackage[0].product_name[0]}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => this.handleQuantityPlus(0, 0)}
                            variant='contained' size='small' color='secondary' style={{ marginRight: 10 }}>+</Button>
                        <Typography>{quantity[0]}</Typography>
                        <Button
                            onClick={() => this.handleQuantityMinus(0, 0)}
                            variant='outlined' size='small' color='secondary' style={{ margin: '0 10px' }}>-</Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { selectedProductPackage, check, quantity } = this.state
        // console.log('props location : ', this.props.location)
        console.log('selectedProductPackage :', selectedProductPackage)
        console.log('check : ', check)

        return (
            <div style={styles.root}>
                {
                    selectedProductPackage[0] ?

                        <Paper style={styles.rootContainer}>
                            <div style={styles.leftContent}>
                                <CardMedia image={selectedProductPackage[0].img} component="img" style={styles.contentImage} />
                            </div>
                            <div style={styles.rightContent}>
                                <Fab style={{ padding: 10, display: 'flex', justifyContent: 'center', borderRadius: 20, marginBottom: 20, width: '100%', backgroundColor: 'blue', color: 'white' }}>
                                    <Typography variant='h6'>{selectedProductPackage[0].package_name}</Typography>
                                </Fab>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px' }}>
                                        <Typography style={{ marginRight: 10 }}>Select Product from Category {selectedProductPackage[0].category_id} : </Typography>
                                    </div>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={check[0]} name={'0'} onChange={(e) => this.handleCheck(e)} />}
                                            label={selectedProductPackage[0].product[0].product_name}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    onClick={() => this.handleQuantityPlus(0, 0)}
                                                    variant='contained' size='small' color='secondary' style={{ marginRight: 10 }}>+</Button>
                                                <Typography>{quantity[0]}</Typography>
                                                <Button
                                                    onClick={() => this.handleQuantityMinus(0, 0)}
                                                    variant='outlined' size='small' color='secondary' style={{ margin: '0 10px' }}>-</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onClick={this.handleAddToCart}
                                        variant='contained'
                                        style={{ backgroundColor: 'yellow', borderRadius: 20 }}
                                        startIcon={<ShoppingCartIcon />}
                                    >Add to Cart</Button>
                                </div>
                            </div>
                        </Paper>

                        : null
                }
            </div>
        )
    }
}

const styles = {
    root: {
        minHeight: '100vh',
        height: 'auto',
        width: '100vw',
        backgroundColor: '#cbe2d6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    rootContainer: {
        width: '80%',
        height: '80%',
        padding: 10,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

export default ProductPackageDetails