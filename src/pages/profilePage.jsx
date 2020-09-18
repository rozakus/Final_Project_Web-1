// import component
import React, { Component } from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { getProfile, editProfile, URL_IMG } from "../actions";

import avatar from "../assets/no-profile.jpg";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  // componentDidMount() {
  //   this.props.getProfile();
  // }

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

  render() {
    const { image, username, email, address, password } = this.props;
    console.log(`username : `, this.props.username);
    console.log(`email : `, this.props.email);
    console.log(`address : `, this.props.address);
    const { edit } = this.state;
    return (
      <div style={styles.root}>
        {/* <h1>Profile</h1> */}
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
              defaultValue="email user"
              variant="outlined"
            />
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <p>Address</p>
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid3"
                  value={address ? address : ""}
                  variant="outlined"
                  disabled={!edit}
                  inputRef={(address) => (this.address = address)}
                />
              </Grid>
            </Grid>
            <div style={styles.buttoncontainer}>
              {!edit ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.setState({ edit: true })}
                >
                  Edit
                </Button>
              ) : null}
              {edit ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              ) : null}
              {edit ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "5px" }}
                  onClick={() => this.setState({ edit: false })}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
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

export default ProfilePage;
