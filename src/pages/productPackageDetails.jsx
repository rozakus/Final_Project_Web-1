// import React Component
import React from 'react'

// import library
import Axios from 'axios'

// import UI
import {
    Paper,
    Button,
    Typography,
    // CardMedia,
    Fab,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
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

    renderTableProductPackage = () => {
        const { selectedProductPackage } = this.state
        return selectedProductPackage.map((category, index) => {
            return (
                <Table key={category.category_id}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Category {category.category_id}</TableCell>
                            <TableCell align="center">Max quantity ({category.max_qty})</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            category.product.map((productItem, index) => {
                                return (
                                    <TableRow key={productItem.product_id}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell>{productItem.product_name}</TableCell>
                                        <TableCell align="center">0</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            )
        })
    }

    render() {
        const { selectedProductPackage } = this.state
        // console.log('props location : ', this.props.location)
        console.log('selectedProductPackage :', selectedProductPackage)

        return (
            <div style={styles.root}>
                {
                    selectedProductPackage[0] ?
                        <Paper style={styles.rootContainer} elevation={5}>
                            {/* <div style={styles.leftContent}>
                                <CardMedia image={selectedProductPackage[0].img} component="img" style={styles.contentImage} />
                            </div> */}
                            <div style={styles.rightContent}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Fab style={{ padding: 10, display: 'flex', borderRadius: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black', marginRight: 20 }}>
                                        <Typography variant='h6'>Package : {selectedProductPackage[0].package_name}</Typography>
                                    </Fab>
                                    <Button
                                        onClick={this.handleAddToCart}
                                        variant='contained'
                                        style={{ backgroundColor: '#cbe2d6', borderRadius: 20, width: '20%' }}
                                        startIcon={<ShoppingCartIcon />}
                                    >Add to Cart</Button>
                                </div>
                                {this.renderTableProductPackage()}
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
        padding: 20,
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