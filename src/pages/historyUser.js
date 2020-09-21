import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core'

class HistoryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/transhistoryuser/${this.props.id_users}`)
        .then (res => {
            console.log(`transaction history user : `, res.data)
            this.setState({data: res.data})
        })
        .catch(err => console.log(`Error transaction history user : `, err))
    }

    renderTableHead = () => {
        return (
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Date Trans.</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Products</TableCell>
            </TableRow>
        )
    }

    renderTableBody = () => {
        return this.state.data.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {/* <TableCell>{item.userID}</TableCell> */}
                    <TableCell>{item.order_number}</TableCell>
                    <TableCell>{item.payment_date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    {/* <TableCell>
                        {item.products.map((aitem, indeks) => {
                            return (
                                <ul key={indeks} style={styles.ul}>
                                <li>Name : {aitem.name}</li>
                                <li>Brand : {aitem.brand}</li>
                                <li>Color : {aitem.color}</li>
                                <li>Size : {aitem.size}</li>
                                <li>Quantity : {aitem.qty}</li>
                                <li>Total : {aitem.total}</li>
                                </ul>
                            )
                        })}
                    </TableCell> */}
                </TableRow>
            )
        })
    }

    render() { 
        return ( 
            <div style={styles.root}>
            <h1 style={styles.title}>{this.props.username}'s Transaction History</h1>
            <Table>
                <TableHead>
                    {this.renderTableHead()}
                </TableHead>
                <TableBody>
                    {this.renderTableBody()}
                </TableBody>
            </Table>
            </div>
         );
    }
}

const styles = {
    root : {
        // marginTop: 100
        height: 'calc(100vh-70px)',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    title : {
        margin : '2% 0px'
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.userReducer.id_users,
        username : state.userReducer.username
    }
    
}
 
export default connect(mapStateToProps)(HistoryUser);