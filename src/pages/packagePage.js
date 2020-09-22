import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  CardMedia,
} from "@material-ui/core";
import Wallpaper from '../assets/images/Wallpaper.jpg'
import wallpaper2 from '../assets/images/wallpaper2.jpg'

class PackagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/getAllPackages`)
      .then((res) => {
        console.log(` packages data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in allPackages : `, err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Package Name </TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Product Name </TableCell>
        <TableCell>Package Price</TableCell>
        {/* <TableCell>Address</TableCell> */}
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.data.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <CardMedia
              image={item.img}
              component="img"
              style={styles.contentImage}
            />
          </TableCell>
          <TableCell>{item.package_name}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.product_name}</TableCell>
          <TableCell>{item.package_price}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <h1>Packages Info</h1>
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
    backgroundImage: `url(${Wallpaper})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 100,
  },
  contentImage: {
    maxWidth: 100,
    maxHeight: 100,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 20,
  }
};

export default PackagePage;
