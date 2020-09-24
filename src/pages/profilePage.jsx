// import component
import React, { Component } from "react";
// import Axios from "axios";
import { connect } from "react-redux";
import {
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  Grid,
  InputAdornment, IconButton, 
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";
// import ClearIcon from "@material-ui/icons/Clear";
// import CheckIcon from "@material-ui/icons/Check";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// import { Link } from "react-router-dom";

import { URL_IMG, upload } from "../actions";

import avatar from "../assets/no-profile.jpg";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      openEditAdress: false,
      openEditPass: false,
      edit: false,
      errorPassword: false,
      errorPasswordMessage: "",
      showPassword: false,
      errorMsg: "",
    };
  }

  handleChoose = (e) => {
    console.log("event : ", e.target.files);
    this.setState({ image: e.target.files[0] }, () =>
      console.log("image : ", this.state.image)
    );
  };

  handleUpload = async () => {
    console.log("image : ", this.state.image);

    // create formdata
    const data = new FormData();
    data.append("IMG", this.state.image);
    // data.append('filename', 'gambar profile')
    console.log("form data : ", data.get("IMG"));

    this.props.upload(data);
    this.setState({ image: null });
  };

  handleClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickOpenEditPass = () => {
    this.setState({ openEditPass: true });
  };

  handleCloseEditPass = () => {
    this.setState({ openEditPass: false });
  };

  handleClickOpenEditAddress = () => {
    this.setState({ openEditAdress: true });
  };

  handleCloseEditAdress = () => {
    this.setState({ openEditAdress: false });
  };

  render() {
    const { image, address, edit } = this.props;
    console.log(`username : `, this.props.username);
    console.log(`email : `, this.props.email);
    console.log(`address : `, this.props.address);

    return (
      <div style={styles.root}>
        <Paper style={styles.profilebox} elevation={3}>
          <div style={styles.avatar}>
            <img
              src={image ? URL_IMG + image : avatar}
              height="100%"
              width="100%"
              alt="profile-img"
            />
          </div>
          <div style={styles.buttonprofile}>
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
              color="primary"
            >
              Upload
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "5px" }}
            >
              Delete
            </Button>
          </div>
          <div style={styles.profileinfo}>
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              value={this.props.email}
              variant="outlined"
            />
          </div>
          <div style={styles.addressdialog}>
            <TableCell colSpan={2}>Address</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpenEditAddress}
              >
                Edit Address
              </Button>
              <Dialog
                open={this.state.openEditAdress}
                onClose={this.handleCloseEditAdress}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change the address
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your new address.
                  </DialogContentText>
                  <TextField
                    id="outlined-multiline-static"
                    label="Your Old Address"
                    multiline
                    rows={4}
                    value={this.props.address}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Your New Address"
                    multiline
                    rows={4}
                    defaultValue="Input your new address here...."
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseEditAdress} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </TableCell>
          </div>
          <div>
            <TableCell colSpan={2}>Password</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpenEditPass}
              >
                Edit Password
              </Button>
              <Dialog
                open={this.state.openEditPass}
                onClose={this.handleCloseEditPass}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change the password
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your password.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New-password"
                    type={this.state.showPassword ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm New-password"
                    type={this.state.showPassword ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseEditPass} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </TableCell>
          </div>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
    backgroundImage: `url(${Wallpaper})`,
  },
  profilebox: {
    width: "30vw",
    height: "100vh",
    backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2% 5%",
  },
  addressdialog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "salmon",
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonprofile: {
    marginTop: "2%",
  },
  profileinfo: {
    width: "100%",
    height: "30%",
    marginTop: "2%",
    paddingBottom: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // papel: {
  //   height: "50%",
  //   width: "50%",
  //   elevation: 5,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 10,
  // },
};

const mapStateToProps = (state) => {
  console.log(`state profile page: `, state.userReducer);
  return {
    username: state.userReducer.username,
    email: state.userReducer.email,
    address: state.userReducer.address,
  };
};

export default connect(mapStateToProps, { upload })(ProfilePage);
