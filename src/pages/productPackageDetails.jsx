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
class ProductPackageDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProductPackage: [],
            productCategory01: [],
            productCategory02: [],
            productCategory03: [],
        }
    }

    componentDidMount() {
        Axios.get(URL + '/getProductPackageDetails/' + this.props.location.search.slice(1))
            .then(res => {
                this.setState({ selectedProductPackage: res.data })
                // console.log('selectedProductPackage : ', this.state.selectedProductPackage)

                Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[0].category_id)
                    .then(res => {
                        this.setState({ productCategory01: res.data })
                        // console.log('productCategory01 : ', this.state.productCategory01)

                        Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[1].category_id)
                            .then(res => {
                                this.setState({ productCategory02: res.data })
                                // console.log('productCategory02 : ', this.state.productCategory02)

                                Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[2].category_id)
                                    .then(res => {
                                        this.setState({ productCategory03: res.data })
                                        // console.log('productCategory03 : ', this.state.productCategory03)
                                    })
                                    .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    // async componentDidMount() {
    //     try {
    //         const package = await Axios.get(URL + '/getProductPackageDetails/' + this.props.location.search.slice(1))
    //         this.setState({ selectedProductPackage: package.data })

    //         const productCategory01 = await Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[0].category_id)
    //         this.setState({ productCategory01e: productCategory01.data })

    //         const productCategory02 = await Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[1].category_id)
    //         this.setState({ productCategory01e: productCategory02.data })

    //         const productCategory03 = await Axios.get(URL + '/getProdCate3/' + this.state.selectedProductPackage[2].category_id)
    //         this.setState({ productCategory01e: productCategory03.data })

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    render() {
        const { selectedProductPackage, productCategory01, productCategory02, productCategory03 } = this.state
        // console.log('props location : ', this.props.location)
        console.log('selectedProductPackage :', selectedProductPackage)
        console.log('productCategory01 : ', productCategory01)
        console.log('productCategory02 : ', productCategory02)
        console.log('productCategory03 : ', productCategory03)
        // console.log('productCategory03 category : ', productCategory03[0])

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
                                    <Typography>Package Price : IDR {`${selectedProductPackage[0].package_price.toLocaleString()}`}.00</Typography>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                                        {/* <Typography>{productCategory01[0].category}</Typography> */}
                                        <Typography style={{ marginRight: 10 }}>Select Product from Milk : </Typography>
                                        <Button variant='contained' size="small" style={{ marginRight: 10, backgroundColor: 'blue', color: 'white', borderRadius: 20 }}>Fisian Flag</Button>
                                        <Typography>Quantity : 5</Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                                        {/* <Typography>{productCategory01[0].category}</Typography> */}
                                        <Typography style={{ marginRight: 10 }}>Select Product from Milk : </Typography>
                                        <Button variant='contained' size="small" style={{ marginRight: 10, backgroundColor: 'blue', color: 'white', borderRadius: 20 }}>Fisian Flag</Button>
                                        <Typography>Quantity : 5</Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                                        {/* <Typography>{productCategory01[0].category}</Typography> */}
                                        <Typography style={{ marginRight: 10 }}>Select Product from Milk : </Typography>
                                        <Button variant='contained' size="small" style={{ marginRight: 10, backgroundColor: 'blue', color: 'white', borderRadius: 20 }}>Fisian Flag</Button>
                                        <Typography>Quantity : 5</Typography>
                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button variant='contained' style={{ backgroundColor: 'blue', color: 'white', borderRadius: 20 }} onClick={this.handleMinus}>-</Button>
                                    <Button>0</Button>
                                    <Button variant='contained' style={{ backgroundColor: 'blue', color: 'white', borderRadius: 20, marginRight: 20 }} onClick={this.handlePlus}>+</Button>
                                    <Button
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
        width: '80%',
        height: '80%',
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

export default ProductPackageDetails