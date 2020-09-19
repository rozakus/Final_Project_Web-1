// import component
import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  CardContent,
  Typography,
  TableRow,
  TableCell,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Link } from "react-router-dom";

import { getProfile, editProfile, URL_IMG } from "../actions";

import avatar from "../assets/no-profile.jpg";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editUserOpen: false,
      passwordUsed: false,
      userError: false,
      passwordError: false,
      errorCurrentPass: false,
      showPassword: false,
      indexPassword: false,
      errorPass: false,
      errorConfPass: false,
      setOpen: false,
      errorTextCurrentPass: "Input your current password.",
      errorTextPass:
        "Password must be at least 6 characters combination of letters, numbers, and symbol.",
      errorTextConfPass: "Confirm password must be matched with password.",
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSave = () => {
    const body = {
      username: this.username.value,
      email: this.email.value,
      address: this.address.value,
      password: this.password.value,
    };
    this.props.editProfile(body);
    this.setState({ edit: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      image,
      errorCurrentPass,
      errorTextCurrentPass,
      errorPass,
      errorTextPass,
      errorConfPass,
      errorTextConfPass,
      showPassword,
      setOpen,
      editEmailOpen,
      emailError,
      emailUsed,
      passwordError,
      indexPassword,
    } = this.props;
    console.log(`username : `, this.props.username);
    console.log(`email : `, this.props.email);
    console.log(`address : `, this.props.address);
    const { edit } = this.state;
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
            <Button variant="contained" color="primary">
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
              defaultValue={this.props.email}
              variant="outlined"
            />
            
          </div>
          <div>
            <TableCell colSpan={2}>Password</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Edit Password
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Change the password</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your password.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New-password"
                    type="password"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm New-password"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
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
    height: "96vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
  },
  profilebox: {
    width: "30vw",
    height: "80vh",
    backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2% 5%",
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
  console.log(`state profile page: `, state.userReducer)
  return {
    username : state.userReducer.username,
    email : state.userReducer.email
  }
}

export default connect(mapStateToProps)(ProfilePage);
