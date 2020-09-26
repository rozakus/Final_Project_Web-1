import React from "react";
import Axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@material-ui/core";
import Wallpaper from '../assets/images/Wallpaper.jpg'
import wallpaper2 from '../assets/images/wallpaper2.jpg'

class SalesReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      salesReport: [],
      package: []
     };
  }

  async componentDidMount() {
    await Axios.get(`http://localhost:2000/salesreport`)
      .then((res) => {
        console.log(` products data : `, res.data);
        this.setState({ salesReport: res.data });
      })
      .catch((err) => console.log(err));
    await Axios.get(`http://localhost:2000/salesreppkg`)
      .then((res) => {
        console.log(` products data : `, res.data);
        this.setState({ package: res.data });
      })
      .catch((err) => console.log(err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Total Modal</TableCell>
        <TableCell>Total Sell</TableCell>
        <TableCell>Profit</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.salesReport.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>{item.total_modal}</TableCell>
          <TableCell>{item.total_sell}</TableCell>
          <TableCell>{item.profit}</TableCell>
        </TableRow>
      );
    });
  };

  renderTableHeadPkg = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Package Name</TableCell>
        <TableCell>Total Modal</TableCell>
        <TableCell>Package Price</TableCell>
        <TableCell>Profit</TableCell>
      </TableRow>
    );
  };

  renderTableBodyPkg = () => {
    return this.state.package.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.package_name}</TableCell>
          <TableCell>{item.total_modal}</TableCell>
          <TableCell>{item.package_price}</TableCell>
          <TableCell>{item.profit}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={styles.paper}>
          <h1>
            Sales Report per Transaction
          </h1>
          <Table>
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table>
          <h1 style={{ marginTop: 20 }}>
            Sales Report Package
          </h1>
          <Table>
            <TableHead>{this.renderTableHeadPkg()}</TableHead>
            <TableBody>{this.renderTableBodyPkg()}</TableBody>
          </Table>
          {/* <h1>
            Sales Report per Transaction
          </h1>
          <Table>
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table> */}
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
    paddingLeft: '15vw',
    paddingTop: '5vh',
    paddingRight: '5vw'
  },
  paper: {
    backgroundImage: `url(${wallpaper2})`
  }
};

export default SalesReport;