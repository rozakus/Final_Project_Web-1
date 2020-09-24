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
} from "@material-ui/core";
import Wallpaper from '../assets/images/Wallpaper.jpg'
import DialogDetails from '../components/dialogDetails'

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
    console.log(this.state.data.details)
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Package Name </TableCell>
        <TableCell>Package Details</TableCell>
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
          <TableCell>
              <DialogDetails
                detail={item.details}
              // cate1={item.details[0].category}
              // qty1={item.details[0].max_qty}
              // cate2={item.details[1].category}
              // qty2={item.details[1].max_qty}
              // cate3={item.details[2].category}
              // qty3={item.details[2].max_qty}
              />
          </TableCell>
          <TableCell>Rp {item.package_price.toLocaleString()}</TableCell>
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
    paddingLeft: '15vw',
    paddingTop: '5vh',
    paddingRight: '5vw'
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
