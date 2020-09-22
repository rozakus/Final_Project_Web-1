import React from 'react'

import { connect } from 'react-redux'

// import UI
import {
    Paper,
    Table,
    TableBody,
    TableHead, TableRow, TableCell
} from '@material-ui/core'

// import action
import { getCartUser } from '../actions'

class CartPage extends React.Component {
    componentDidMount() {
        this.props.getCartUser(3)
    }

    renderTableHead = () => {
        return (
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell >Package</TableCell>
                <TableCell >Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
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
                    <TableCell>{`IDR ${item.price_sell.toLocaleString()},00`}</TableCell>
                    <TableCell>{item.product_qty}</TableCell>
                    <TableCell>{`IDR ${item.total_sell.toLocaleString()},00`}</TableCell>
                    <TableCell></TableCell>
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
