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
        this.props.getCartUser(localStorage.getItem('id'))
    }

    renderTableHeadPcs = () => {
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

    renderTableBodyPcs = () => {
        return this.props.resultPcs.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        console.log('resultPcs : ', this.props.resultPcs)
        console.log('resultPkg : ', this.props.resultPkg)
        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer}>
                    {
                        this.props.resultPcs[0] ?
                            <Table>
                                <TableHead>{this.renderTableHeadPcs()}</TableHead>
                                <TableBody>{this.renderTableBodyPcs()}</TableBody>
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
