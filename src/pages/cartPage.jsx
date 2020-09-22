import React from 'react'

import { connect } from 'react-redux'

// import UI
import {
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Button
} from '@material-ui/core'

// import action
import { getCartUser } from '../actions'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.props.getCartUser(3)
    }

    renderTableHead = () => {
        return (
            <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Package</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
        )
    }

    renderTableBody = () => {
        return this.props.cart.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.package_name}</TableCell>
                    <TableCell style={{ display: 'flex', alignItems: 'center' }}><img src={item.image} width="50px" alt="product-img" />{item.product_name}</TableCell>
                    <TableCell align="right">{`IDR ${item.price_sell.toLocaleString()},00`}</TableCell>
                    <TableCell align="center">{item.product_qty}</TableCell>
                    <TableCell align="right">{`IDR ${item.total_sell.toLocaleString()},00`}</TableCell>
                    <TableCell align="center">
                        <Button
                            onClick={() => this.setState({ selectedIndex: index })}
                            variant="contained"
                            color="primary"
                            size='small'
                            style={{ marginRight: 10 }}
                        >Edit</Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size='small'
                        >Delete</Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer}>
                    <Table>
                        <TableHead>{this.renderTableHead()}</TableHead>
                        <TableBody>{this.renderTableBody()}</TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root: {
        padding: '100px 10px 10px 10px',
        backgroundColor: '#cbe2d6',
        minHeight: '100vh',
        height: 'auto'
    },
    rootContainer: {
        minHeight: '80vh',
        width: '100%',
        padding: '20px',
        borderRadius: 20
    }
}

const MapStateToProps = (globalState) => {
    return {
        cart: globalState.cartReducer.cart
    }
}

export default connect(MapStateToProps, { getCartUser })(CartPage)
