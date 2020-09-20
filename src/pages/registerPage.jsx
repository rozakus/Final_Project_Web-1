// import component
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import UI
import {
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { signUp } from "../actions";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errorUsername: false,
      errorUsernameMessage: "",
      errorEmail: false,
      errorEmailMessage: "",
      errorPassword: false,
      errorPasswordMessage: "",
    };
  }

  handleRegister = () => {
    let inputUsername = this.inputUsername.value; // username or password
    let inputEmail = this.inputEmail.value; // username or password
    let inputPassword = this.inputPassword.value; // password
    let inputPasswordConfirm = this.inputPasswordConfirm.value; // password

    if (
      !inputUsername ||
      !inputEmail ||
      !inputPassword ||
      !inputPasswordConfirm
    ) 
      return console.log("input kosong");

    console.log(
      { inputUsername },
      { inputEmail },
      { inputPassword },
      { inputPasswordConfirm }
    );

    this.props.signUp({
        username : inputUsername,
        email : inputEmail,
        password : inputPassword,
        confpass : inputPasswordConfirm
    })
  };

  handleInputUsername = (e) => {
    // store onchange event input
    let inputUsername = e.target.value;

    // test validation
    let testLength = inputUsername.length >= 6;
    // if valid
    if (testLength)
      return (
        this.setState({ errorUsername: false }),
        this.setState({ errorUsernameMessage: "" })
      );
    // if not valid
    if (!testLength)
      return (
        this.setState({ errorUsername: true }),
        this.setState({ errorUsernameMessage: "minimum 6 character." })
      );
  };

  handleInputEmail = (e) => {
    // store onchange event input
    let inputEmail = e.target.value;

    // regex
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // test validation
    let testEmail = email.test(inputEmail);

    // if valid
    if (testEmail)
      return (
        this.setState({ errorEmail: false }),
        this.setState({ errorEmailMessage: "" })
      );

    // if not valid
    if (!testEmail)
      return (
        this.setState({ errorEmail: true }),
        this.setState({ errorEmailMessage: "example@gmail.com" })
      );
  };

  handleInputPassword = (e) => {
    // store onchange event
    let inputPassword = e.target.value;

    // regex
    let number = /[0-9]/;
    let specialChar = /[!@#$%^&*;]/;

    // test validation
    let testNumber = number.test(inputPassword);
    let testSpecialChar = specialChar.test(inputPassword);
    let testLength = inputPassword.length >= 6;

    // number
    if (!testNumber)
      return (
        this.setState({ errorPassword: true }),
        this.setState({ errorPasswordMessage: "should includes number." })
      );

    // special char
    if (!testSpecialChar)
      return (
        this.setState({ errorPassword: true }),
        this.setState({
          errorPasswordMessage: "should includes special character.",
        })
      );

    // length
    if (testLength)
      return (
        this.setState({ errorPassword: false }),
        this.setState({ errorPasswordMessage: "" })
      );
    if (!testLength)
      return (
        this.setState({ errorPassword: true }),
        this.setState({ errorPasswordMessage: "minimum 6 character." })
      );
  };

  render() {
    const {
      redirect,
      errorUsername,
      errorUsernameMessage,
      errorEmail,
      errorEmailMessage,
      errorPassword,
      errorPasswordMessage,
    } = this.state;
    if (redirect) return <Redirect to="/login" />;

    if (this.props.username) return <Redirect to="/" />;

    return (
      <div style={styles.root}>
        <Paper style={styles.registerContainer}>
          <Typography variant="h5" style={styles.header}>
            Register
          </Typography>
          <div style={styles.inputContainer}>
            <TextField
              style={{ marginBottom: 10 }}
              label="username"
              variant="outlined"
              inputRef={(inputUsername) => (this.inputUsername = inputUsername)}
              onChange={(e) => this.handleInputUsername(e)}
              helperText={
                errorUsername ? errorUsernameMessage : errorUsernameMessage
              }
              error={errorUsername}
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
              label="email"
              variant="outlined"
              inputRef={(inputEmail) => (this.inputEmail = inputEmail)}
              onChange={(e) => this.handleInputEmail(e)}
              helperText={errorEmail ? errorEmailMessage : errorEmailMessage}
              error={errorEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginBottom: 10 }}
              label="password"
              variant="outlined"
              inputRef={(inputPassword) => (this.inputPassword = inputPassword)}
              onChange={(e) => this.handleInputPassword(e)}
              helperText={
                errorPassword ? errorPasswordMessage : errorPasswordMessage
              }
              error={errorPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginBottom: 10 }}
              label="confirm password"
              variant="outlined"
              inputRef={(inputPasswordConfirm) =>
                (this.inputPasswordConfirm = inputPasswordConfirm)
              }
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
            onClick={this.handleRegister}
            variant="contained"
            color="primary"
          >
            Register
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
              Login
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
  registerContainer: {
    height: "80%",
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

export default connect(mapStateToProps, { signUp })(RegisterPage);
