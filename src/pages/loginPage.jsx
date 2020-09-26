// import component
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import UI
import {
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment, IconButton, 
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Wallpaper from "../assets/images/Wallpaper.jpg";
import wallpaper2 from "../assets/images/wallpaper2.jpg";

import { SignIn } from "../actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errorPassword: false,
      errorPasswordMessage: "",
      showPassword: false,
      errorMsg: "",
    };
  }

  handleLogin = () => {
    const body = {
      identity: this.inputIdentity.value, // username or password
      password: this.password.value,
    };

    if (!this.inputIdentity || !this.password)
      return console.log("Empty Input");

    console.log(body);
    this.props.SignIn(body);
    this.inputIdentity.value = "";
    this.password.value = "";
  };

  handleClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    
    if (this.props.username) {
      return <Redirect to="/" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/register" />;
    }

    return (
      <div style={styles.root}>
        <Paper style={styles.loginContainer} elevation={3}>
          <Typography variant="h5" style={styles.header}>
            LOGIN FORM
          </Typography>
          <div style={styles.inputContainer}>
            <TextField
              style={{ marginBottom: 10 }}
              label="Username or Email"
              variant="outlined"
              inputRef={(inputIdentity) => (this.inputIdentity = inputIdentity)}
              // helperText={this.props.errorMsg}
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
              helperText={this.props.errorMsg}
              type={this.state.showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ), endAdornment: (<InputAdornment position="end">
                      <IconButton onClick={() => this.handleClick()}>
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>)
              }}
            />
          </div>
          <div>
            <Typography>{this.state.errorMsg}</Typography>
          </div>
          <Button
            onClick={this.handleLogin}
            variant="contained"
            color="black"
            style={{
                        backgroundColor: "#cbe2d6",
                        borderRadius: 20,
                      }}
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
    height: "auto",
    minHeight: "100vh",
    backgroundImage: `url(${Wallpaper})`,
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
    backgroundImage: `url(${wallpaper2})`,
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
    errorMsg: state.userReducer.errorMsg
  };
};

export default connect(mapStateToProps, { SignIn })(LoginPage);
