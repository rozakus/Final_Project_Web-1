import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// import UI
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Typography
} from '@material-ui/core'

import Wallpaper from '../assets/images/Wallpaper.jpg'

// import
import { URL } from '../actions'

class HistoryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await Axios.get(URL + '/purchasedhistory/' + localStorage.getItem('id'))
            .then(res => {
                console.log(`transaction history user : `, res.data)
                this.setState({ data: res.data })
            })
            .catch(err => console.log(`Error transaction history user : `, err))
    }

    renderTableHead = () => {
        return (
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Transfer Via Bank</TableCell>
                <TableCell align='center'>Total</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell >Payment Status</TableCell>
            </TableRow>
        )
    }

    renderTableBody = () => {
        return this.state.data.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.order_number}</TableCell>
                    <TableCell>{item.payment_date}</TableCell>
                    <TableCell align='center'>{item.via_bank}</TableCell>
                    <TableCell align='right'>{item.amount}</TableCell>
                    <TableCell>{item.status_order}</TableCell>
                    <TableCell>{item.status_payment}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer} elevation={3}>
                    <Paper style={styles.title} elevation={3}>
                        <Typography variant="h4">{this.props.username} Transaction History</Typography>
                    </Paper>
                    {
                        this.state.data[0] ?
                            <Table>
                                <TableHead>{this.renderTableHead()}</TableHead>
                                <TableBody>{this.renderTableBody()}</TableBody>
                            </Table>
                            : null
                    }
                </Paper>
            </div>
        );
    }
}

const styles = {
    root: {
        // marginTop: 100
        height: "auto",
        minHeight: "100vh",
        backgroundImage: `url(${Wallpaper})`,
        padding: '90px 10% 3% 10%',
        display: 'flex',
        flexDirection: 'column',
    },
    rootContainer: {
        padding: 20,
        borderRadius: 20,
        minHeight: '80vh'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#cbe2d6'
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userReducer.id_users,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps)(HistoryUser);