import React from "react";
import Axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  CardMedia,
  Button
} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Wallpaper from "../assets/images/Wallpaper.jpg";

class HistoryTrans extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/transhistory`)
      .then((res) => {
        console.log(` products data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Payment Date</TableCell>
        <TableCell>Via Bank</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Transaction Receipt</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.data.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.payment_date}</TableCell>
          <TableCell>{item.via_bank}</TableCell>
          <TableCell>{item.amount}</TableCell>
          <TableCell>{item.transaction_receipt}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
              {
                item.payment_status_id == 1
                ? 
                <div>
                    <Button><CheckCircleIcon/></Button>
                    <Button><CancelIcon/></Button>
                </div>
                :
                <div></div>
              }
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <h1>Transaction Info</h1>
          <Table>
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "auto",
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url(${Wallpaper})`,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "15vw",
    paddingTop: "5vh",
    paddingRight: "5vw",
  },
};

export default HistoryTrans;
