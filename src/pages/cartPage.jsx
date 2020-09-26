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
    Button,
    Typography,
    Modal,
    FormControl,
    MenuItem,
    Select,
    InputLabel
} from '@material-ui/core'

// import action
import { getCartUser } from '../actions'

// import
import { URL } from '../actions'

// import
import Wallpaper from '../assets/images/Wallpaper.jpg'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edited_product_id: null,
            edited_product_qty: 0,
            edited_total_sell: 0,
            edited_total_modal: 0,
            amount_product: 0,
            amount_package: 0,
            amount: 0,
            modalOpen: false,
            paymentMethod: [],
            selected_payment_type_id: null,
        }
    }

    async componentDidMount() {
        await this.props.getCartUser(localStorage.getItem('id'))
        await this.calculateAmountProduct()
        await this.calculateAmountPackage()
        await this.calculateAmount()
        await Axios.get(URL + '/paymentMethod')
            .then(res => {
                this.setState({ paymentMethod: res.data })
            })
            .catch(err => console.log(err))
    }

    calculateAmountProduct = async () => {
        await this.setState({ amount_product: 0 })
        await this.props.resultPcs.map((item, index) => this.setState({ amount_product: this.state.amount_product + item.total_sell }))
    }

    calculateAmountPackage = async () => {
        await this.setState({ amount_package: 0 })
        await this.props.resultPkg.map((item, index) => this.setState({ amount_package: this.state.amount_package + item.total_sell }))
    }

    calculateAmount = async () => {
        await this.setState({ amount: 0 })
        await this.setState({ amount: this.state.amount_product + this.state.amount_package })
    }

    resetState = async () => {
        await this.setState({ edited_product_qty: 0 })
        await this.setState({ edited_total_sell: 0 })
        await this.setState({ edited_total_modal: 0 })
        await this.setState({ edited_product_id: null })
    }

    // handling function
    handleDeletePcs = async (item) => {
        console.log('Delete Pcs : ', item)

        const order_number = item.order_number
        const product_id = item.product_id

        console.log({ order_number }, { product_id })
        // axios delete gabisa ngirim body langsung, harus disetting, kalau params bisa
        Axios.delete(URL + '/deletepcs/' + order_number + '/' + product_id)
        await this.resetState()
        await this.props.getCartUser(localStorage.getItem('id'))
        await this.calculateAmountProduct()
        await this.calculateAmount()
    }

    handleEditPcs = async (product_id) => {
        console.log('Product Id : ', product_id)
        await this.setState({ edited_product_id: product_id })
        await console.log('edited_product_id : ', this.state.edited_product_id)
    }

    handleEditMinus = async (item) => {
        if (this.state.edited_product_qty === 0) return null

        await this.setState({ edited_product_qty: this.state.edited_product_qty - 1 })
        await this.setState({ edited_total_sell: item.price_sell * this.state.edited_product_qty })
        await this.setState({ edited_total_modal: item.price_modal * this.state.edited_product_qty })
    }

    handleEditPlus = async (item) => {
        await this.setState({ edited_product_qty: this.state.edited_product_qty + 1 })
        await this.setState({ edited_total_sell: item.price_sell * this.state.edited_product_qty })
        await this.setState({ edited_total_modal: item.price_modal * this.state.edited_product_qty })
    }

    handleEditConfirm = async (item) => {

        if (!this.state.edited_product_qty || !this.state.edited_total_modal || !this.state.edited_total_sell) return console.log('quantity is empty')

        const body = {
            qty: this.state.edited_product_qty,
            total_modal: this.state.edited_total_modal,
            total_sell: this.state.edited_total_sell,
            product_id: item.product_id,
            order_number: item.order_number
        }
        console.log('body : ', body)

        await Axios.patch(URL + '/editqtypcs', body)
        await this.resetState()
        await this.props.getCartUser(localStorage.getItem('id'))
        await this.calculateAmountProduct()
        await this.calculateAmount()
    }

    handleEditCancel = async () => {
        await this.resetState()
    }

    // package
    handleDeletePkg = async (item) => {
        console.log('item package', item)

        const order_number = item.order_number
        const package_id = item.package_id
        const package_no = item.package_no
        console.log({ order_number }, { package_id }, { package_no })

        Axios.delete(URL + '/deletepkg/' + order_number + '/' + package_id + '/' + package_no)
        await this.props.getCartUser(localStorage.getItem('id'))
        await this.calculateAmountPackage()
        await this.calculateAmount()
    }

    handleCheckout = async () => {
        console.log('amount : ', this.state.amount)
        await this.setState({ modalOpen: true })
    }

    handleModalClose = async () => {
        await this.setState({ modalOpen: false })
    }

    handleChangePayment = async (event) => {
        await this.setState({ selected_payment_type_id: event.target.value })
        await console.log('selected payment type id : ', this.state.selected_payment_type_id)
    }

    handleUploadReceipt = async () => {
        // await this.props.resultPcs.map((item, index) => this.setState({ amount_product: this.state.amount_product + item.total_sell }))

        // const body = {
        //     users_id: localStorage.getItem('id'),
        //     order_number: ,
        //     payment_type: ,
        //     amount: 
        // }

        // console.log('body payment : ', body)
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
                <TableCell align="center">Package Composition</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
        )
    }

    renderTableBodyPkg = () => {
        return this.props.resultPkg.map((item, index) => {
            // console.log(item.product_name.split(','))
            return (
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{item.package_name}</TableCell>
                    <TableCell>
                        {item.product_name}
                    </TableCell>
                    <TableCell>{item.total_sell}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => this.handleDeletePkg(item)}
                            color="secondary">delete</Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    // render modal
    renderModalCheckOutPayment = () => {
        // console.log('Payment method : ', this.state.paymentMethod)

        return (
            <Paper style={styles.modalContent} elevation={5}>
                <Typography style={{ marginBottom: 20 }} variant='h5'>Payment</Typography>
                <Table style={{ width: '40%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Total Payment</TableCell>
                            <TableCell>{this.state.amount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>
                                {this.props.address}
                                <Button variant='contained' color='primary' style={{ marginLeft: 10 }}>
                                    Send different Address
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Choose Payment</TableCell>
                            <TableCell>
                                {
                                    this.state.paymentMethod[0] ?
                                        <FormControl variant="" style={{ minWidth: 200, backgroundColor: '' }}>
                                            <InputLabel id='payment'>Transfer via bank</InputLabel>
                                            <Select
                                                value={this.state.selected_payment_type_id}
                                                onChange={(event) => this.handleChangePayment(event)}
                                                label="payment"
                                                id='payment'
                                            >
                                                <MenuItem value="">
                                                    <em>select bank</em>
                                                </MenuItem>
                                                <MenuItem value={this.state.paymentMethod[0].id_payment_type}>{this.state.paymentMethod[0].via_bank}</MenuItem>
                                                <MenuItem value={this.state.paymentMethod[1].id_payment_type}>{this.state.paymentMethod[1].via_bank}</MenuItem>
                                                <MenuItem value={this.state.paymentMethod[2].id_payment_type}>{this.state.paymentMethod[2].via_bank}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        : null
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <Button
                                    onClick={this.handleUploadReceipt}
                                    variant='contained' color='primary'
                                >Upload Transaction Receipt</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Paper>
        )
    }

    render() {
        // console.log('resultPcs : ', this.props.resultPcs)
        // console.log('resultPkg : ', this.props.resultPkg)
        // console.log('address : ', this.props.address)

        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer} elevation={10}>
                    <div style={styles.header}>
                        <Typography>{this.state.amount}</Typography>
                        <Button
                            onClick={this.handleCheckout}
                        >Checkout</Button>
                    </div>
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
                    <div style={styles.modalContainer}>
                        <Modal
                            open={this.state.modalOpen}
                            onClose={this.handleModalClose}
                            style={styles.modal}
                        >
                            {this.renderModalCheckOutPayment()}
                        </Modal>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root: {
        padding: '100px 10px 10px 10px',
        backgroundImage: `url(${Wallpaper})`,
        minHeight: '100vh',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center'
    },
    rootContainer: {
        minHeight: '80vh',
        width: '80%',
        padding: '20px',
        borderRadius: 20
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        position: 'absolute',
        width: '100%',
        heigh: '100%',
        padding: '100px 50px 50px 50px',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const MapStateToProps = (globalState) => {
    return {
        resultPcs: globalState.cartReducer.resultPcs,
        resultPkg: globalState.cartReducer.resultPkg,
        address: globalState.userReducer.address
    }
}

export default connect(MapStateToProps, { getCartUser })(CartPage)
