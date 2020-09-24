import React from 'react'

import { connect } from 'react-redux'
import Axios from 'axios'

// import UI
import {
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core'

// import action
import { getCartUser } from '../actions'

// import
import { URL } from '../actions'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edited_product_id: null,
            edited_product_qty: 0,
            edited_total_sell: 0,
            edited_total_modal: 0
        }
    }

    componentDidMount() {
        this.props.getCartUser(localStorage.getItem('id'))
    }

    resetState = () => {
        this.setState({ edited_product_qty: 0 },
            () => this.setState({ edited_total_sell: 0 },
                () => this.setState({ edited_total_modal: 0 },
                    () => this.setState({ edited_product_id: null }))))
    }

    // handling function
    handleDeletePcs = (item) => {
        console.log('Delete Pcs : ', item)

        const body = {
            order_number: item.order_number,
            product_id: item.product_id
        }

        console.log('body : ', body)
        Axios.delete(URL + '/deletepcs', { data: body })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

        // this.renderTableBodyPcs()
    }

    handleEditPcs = (product_id) => {
        console.log('Product Id : ', product_id)
        this.setState({ edited_product_id: product_id },
            () => console.log('edited_product_id : ', this.state.edited_product_id))
    }

    handleEditMinus = (item) => {
        if (this.state.edited_product_qty === 0) return null
        this.setState({ edited_product_qty: this.state.edited_product_qty - 1 },
            () => this.setState({ edited_total_sell: item.price_sell * this.state.edited_product_qty },
                () => this.setState({ edited_total_modal: item.price_modal * this.state.edited_product_qty })))
    }

    handleEditPlus = (item) => {
        this.setState({ edited_product_qty: this.state.edited_product_qty + 1 },
            () => this.setState({ edited_total_sell: item.price_sell * this.state.edited_product_qty },
                () => this.setState({ edited_total_modal: item.price_modal * this.state.edited_product_qty })))
    }

    handleEditConfirm = (item) => {

        if (!this.state.edited_product_qty || !this.state.edited_total_modal || !this.state.edited_total_sell) return console.log('quantity is empty')

        const body = {
            qty: this.state.edited_product_qty,
            total_modal: this.state.edited_total_modal,
            total_sell: this.state.edited_total_sell,
            product_id: item.product_id,
            order_number: item.order_number
        }
        console.log('body : ', body)

        Axios.patch(URL + '/editqtypcs', body)
            .then(res => {
                this.resetState()
                this.props.getCartUser(localStorage.getItem('id'))
                this.renderTableBodyPcs()
            })
            .catch(err => console.log(err))
    }

    handleEditCancel = () => {
        this.resetState()
    }

    // render Product Pcs
    renderTableHeadPcs = () => {
        return (
            <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
        )
    }

    renderTableBodyPcs = () => {
        return this.props.resultPcs.map((item, index) => {
            // kalo edited
            if (item.product_id === this.state.edited_product_id) return (
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.image} style={{ width: 50 }}></img>
                        {item.product_name}
                    </TableCell>
                    <TableCell align="right">{item.price_sell}</TableCell>
                    <TableCell align="center">
                        <Button
                            onClick={() => this.handleEditMinus(item)}>-</Button>
                        {this.state.edited_product_qty}
                        <Button
                            onClick={() => this.handleEditPlus(item)}>+</Button>
                    </TableCell>
                    <TableCell align="right">{this.state.edited_total_sell}</TableCell>
                    <TableCell align="center">
                        <Button
                            onClick={() => this.handleEditConfirm(item)}
                            variant="outlined" color="secondary">confirm</Button>
                        <Button
                            onClick={this.handleEditCancel}
                            color="secondary">cancel</Button>
                    </TableCell>
                </TableRow>
            )

            // kalo gak diedit
            if (item.product_id !== this.state.edited_product_id) return (
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.image} style={{ width: 50 }}></img>
                        {item.product_name}
                    </TableCell>
                    <TableCell align="center">{item.price_sell}</TableCell>
                    <TableCell align="center">{item.product_qty}</TableCell>
                    <TableCell align="center">{item.total_sell}</TableCell>
                    <TableCell align="center">
                        <Button
                            onClick={() => this.handleEditPcs(item.product_id)}
                            variant="outlined" color="secondary">edit</Button>
                        <Button
                            onClick={() => this.handleDeletePcs(item)}
                            color="secondary">delete</Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    // render Product Pkg
    renderTableHeadPkg = () => {
        return (
            <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Package</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Package Composition</TableCell>
            </TableRow>
        )
    }

    renderTableBodyPkg = () => {
        return this.props.resultPkg.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{item.package_name}</TableCell>
                    <TableCell>{item.total_sell}</TableCell>
                    <TableCell>{item.product_name}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        // console.log('resultPcs : ', this.props.resultPcs)
        // console.log('resultPkg : ', this.props.resultPkg)

        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer} elevation={10}>
                    {
                        this.props.resultPcs[0] ?
                            <Table style={{ marginBottom: 20 }}>
                                <TableHead style={{ backgroundColor: '#cbe2d6' }}>{this.renderTableHeadPcs()}</TableHead>
                                <TableBody>{this.renderTableBodyPcs()}</TableBody>
                            </Table>
                            : null
                    }
                    {
                        this.props.resultPkg[0] ?
                            <Table>
                                <TableHead style={{ backgroundColor: '#cbe2d6' }}>{this.renderTableHeadPkg()}</TableHead>
                                <TableBody>{this.renderTableBodyPkg()}</TableBody>
                            </Table>
                            : null
                    }
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
        resultPcs: globalState.cartReducer.resultPcs,
        resultPkg: globalState.cartReducer.resultPkg
    }
}

export default connect(MapStateToProps, { getCartUser })(CartPage)
