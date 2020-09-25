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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  Typography,
  InputLabel,
  InputAdornment,
  Select,
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";
import DialogDetails from "../components/dialogDetails";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

class PackagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openAddPkgButton: false,
      selectedQuantity: 0,
      openDialogDelete: false,
      productName: [],
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/getAllPackages`)
      .then((res) => {
        console.log(` packages data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in allPackages : `, err));
  }

  handleAddToList = () => {
    const { newPkgName, newPkgQty } = this.state;
    console.log("test");
  };
  handleClickOpenDialogDelete = () => {
    this.setState({ openDialogDelete: true });
    console.log(`open dialog delete`);
  };

  handleCloseDialogDelete = () => {
    this.setState({ openDialogDelete: false });
  };

  handleOpenAddPkgButton = () => {
    this.setState({ openAddPkgButton: true });
  };

  handleCloseAddPkgButton = () => {
    this.setState({ openAddPkgButton: false });
  };

  handleMinus = () => {
    if (this.state.selectedQuantity === 0) return null;
    this.setState({ selectedQuantity: this.state.selectedQuantity - 1 });
  };

  handleMinus = () => {
    if (this.state.selectedQuantity === 0) return null;
    this.setState({ selectedQuantity: this.state.selectedQuantity + 1 });
  };

  renderTableHead = () => {
    console.log(this.state.data.details);
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Package Name </TableCell>
        <TableCell>Package Details</TableCell>
        <TableCell>Package Price</TableCell>
        <TableCell>Action</TableCell>
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
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClickOpenDialogDelete}
              // className={}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Dialog
              open={this.state.openDialogDelete}
              onClose={this.handleCloseDialogDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do yo want to delete this package?"}
              </DialogTitle>
              {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent> */}
              <DialogActions>
                <Button onClick={this.handleCloseDialogDelete} color="primary">
                  No
                </Button>
                <Button
                  onClick={this.handleCloseDialogDelete}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { selectedQuantity } = this.state;
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <div style={styles.packageinfoandadd}>
            <h1>Packages Info</h1>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={this.handleOpenAddPkgButton}
              style={{
                backgroundColor: "#cbe2d6",
                color: "black",
                borderRadius: 20,
                marginRight: 20,
              }}
              // className={classes.button}
              startIcon={<AddBoxIcon />}
            >
              Add Package
            </Button>
            <Dialog
              fullScreen
              open={this.state.openAddPkgButton}
              onClose={this.handleCloseAddPkgButton}
              // TransitionComponent={Transition}
              // aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Input the Details Package
              </DialogTitle>
              <DialogContent
                style={{ display: "flex", flexDirection: "column", margin: 5 }}
              >
                <FormControl variant="outlined">
                  <DialogContentText>Input the Package Image</DialogContentText>
                  <div style={styles.pkgimg}>
                    <form encType="multipart/form-data">
                      <input
                        type="file"
                        accept="image/*"
                        name="IMG"
                        onChange={(e) => this.handleChoose(e)}
                      />
                    </form>
                    <Button
                      onClick={this.handleUpload}
                      variant="contained"
                      style={{
                        backgroundColor: "#cbe2d6",
                        borderRadius: 20,
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                  <DialogContentText>Input the Package Name</DialogContentText>
                  <div style={styles.pkgname}>
                    <TextField
                      id="outlined-textarea"
                      label="Package Name"
                      placeholder="Input the package name here..."
                      variant="outlined"
                      inputRef={(newPkgName) => (this.newPkgName = newPkgName)}
                    />
                  </div>
                  <DialogContentText>
                    Input the Category Package
                  </DialogContentText>
                  <div style={styles.catpkg}>
                    {/* <InputLabel id="demo-simple-select-outlined-label">
                    Category Package
                    </InputLabel> */}
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // value={age}
                      // onChange={handleChange}
                      label="Category Package"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <TextField
                      id="standard-number"
                      label="Quantity"
                      type="number"
                      defaultValue="0"
                      inputRef={(newPkgQty) => (this.newPkgQty = newPkgQty)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#cbe2d6",
                        borderRadius: 20,
                        marginRight: 20,
                      }}
                      onClick={this.handleAddToList}
                    >
                      Add to List
                    </Button>
                  </div>
                  <div style={styles.disableBox}>
                    <Typography>List Package Details</Typography>
                    <div style={{ marginLeft: 15 }}>
                      <ul>
                        {/* {this.state.productName.map((item, index) => {
                        return <li>{item}</li>;
                      })} */}
                        <Typography>msh kosong</Typography>
                      </ul>
                    </div>
                  </div>
                  <div style={styles.pgkprice}>
                    <DialogContentText>
                      Input the Package Price
                    </DialogContentText>
                    <TextField
                      label="Package Price"
                      id="outlined-start-adornment"
                      defaultValue="0"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </div>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseAddPkgButton} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSaveEditedAddress} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
    paddingLeft: "15vw",
    paddingTop: "5vh",
    paddingRight: "5vw",
  },
  pkgimg: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
    width: 40,
  },
  pgkprice: {
    marginTop: 5,
  },
  pkgname: {
    marginBottom: 5,
    marginTop: 0,
  },
  catpkg: {
    width: 600,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonplusminus: {
    marginTop: 5,
    justifyContent: "space-between",
  },
  contentImage: {
    maxWidth: 100,
    maxHeight: 100,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  packageinfoandadd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "1%",
  },
  disableBox: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
};

export default PackagePage;
