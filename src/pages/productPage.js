import React from "react";
import Axios from "axios";
// import Paper from "@material-ui/core/Paper";
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


class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/getAllProducts`)
      .then((res) => {
        console.log(` products data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in allProducts : `, err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>ID-Product</TableCell>
        <TableCell>Product Name</TableCell>
        <TableCell>Product Category</TableCell>
        <TableCell>Price Modal</TableCell>
        <TableCell>Price Sell</TableCell>
        <TableCell>Stock</TableCell>
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
              image={item.image}
              component="img"
              style={styles.contentImage}
            />
          </TableCell>
          <TableCell>{item.id_product}</TableCell>
          <TableCell>{item.product_name}</TableCell>
          <TableCell>{item.product_cate}</TableCell>
          <TableCell>{item.price_modal}</TableCell>
          <TableCell>{item.price_sell}</TableCell>
          <TableCell>{item.product_stock}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <h1>Products Info</h1>
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 100
  },
  contentImage: {
    maxWidth: 100,
    maxHeight: 100,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 20,
  },
};

export default ProductPage;
