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
    FormControlLabel,
    Table,
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
        return (
            <div>

            </div>
        )
    }

    render() {
        const { selectedProductPackage } = this.state
        // console.log('props location : ', this.props.location)
        console.log('selectedProductPackage :', selectedProductPackage)

        return (
            <div style={styles.root}>
                {
                    selectedProductPackage[0] ?

                        <Paper style={styles.rootContainer}>
                            <div style={styles.leftContent}>
                                <CardMedia image={selectedProductPackage[0].img} component="img" style={styles.contentImage} />
                            </div>
                            <div style={styles.rightContent}>
                                <Fab style={{ padding: 10, display: 'flex', justifyContent: 'center', borderRadius: 20, marginBottom: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black' }}>
                                    <Typography variant='h6'>{selectedProductPackage[0].package_name}</Typography>
                                </Fab>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onClick={this.handleAddToCart}
                                        variant='contained'
                                        style={{ backgroundColor: '#cbe2d6', borderRadius: 20 }}
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