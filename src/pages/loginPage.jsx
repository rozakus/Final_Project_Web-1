// import component
import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import UI
import {
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { SignIn } from "../actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleLogin = () => {
      const body = {
        username : this.username.value, // username or password
        password : this.password.value
      }
      console.log(body)
      this.props.SignIn(body)
      this.username.value = ''
      this.password.value = ''
  };

  render() {
    if (this.props.username) {return <Redirect to='/'/> }

    if (this.state.redirect) {return <Redirect to='/register'/> }
    return (
      <div style={styles.root}>
        <Paper style={styles.loginContainer} elevation={3}>
          <Typography variant="h5" style={styles.header}>
            Login
          </Typography>
          <div style={styles.inputContainer}>
            <TextField
              style={{ marginBottom: 10 }}
              label="Username or Email"
              variant="outlined"
              inputRef={(username) => (this.username = username)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginBottom: 10 }}
              label="Password"
              variant="outlined"
              inputRef={(password) => (this.password = password)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            onClick={this.handleLogin}
            variant="contained"
            color="primary"
          >
            login
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2">Already have account?</Typography>
            <Button onClick={() => this.setState({ redirect: true })}>
              Register
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    marginTop: 50,
    backgroundColor: "ghostwhite",
    height: "100vh",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    height: "50%",
    width: "50%",
    elevation: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { SignIn })(LoginPage);
