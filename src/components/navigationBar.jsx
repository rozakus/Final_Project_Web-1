// import component
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Profile from "./profile";
import AvatarProfile from "./avatar";
import { connect } from "react-redux";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    console.log(event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };
  render() {
    return (
      <AppBar position="fixed" style={styles.root} elevation={0}>
        <Toolbar style={styles.toolbar}>
          <div style={styles.leftContent}>
            <Link to="/" style={styles.link}>
              <Avatar src={require('../assets/images/Logo.png')} />
            </Link>
          </div>
          <div style={styles.rightContent}>
            {/* <Link to="/profile" style={styles.link}>
              <Typography variant="h6" style={{ marginRight: 10 }}>
                Profile
              </Typography>
            </Link>
            <Link to="/cart" style={styles.link}>
              <Typography variant="h6" style={{ marginRight: 10 }}>
                Cart
              </Typography>
            </Link> */}
            {this.props.username === '' ? (
              <Profile />
            ) : (
                <AvatarProfile nama={this.props.username} />
              )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    height: 50,
    padding: '50px 10px',
    display: "flex",
    justifyContent: "center",
    backgroundColor: 'transparent',
    // backgroundColor: '#0000ff',
    // backgroundColor: 'white'
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: '0px 20px',
    backgroundColor: 'rgba(19,15,0, .5)',
    borderRadius: 20
  },
  leftContent: {
    height: "100%",
    flexBasis: "50%",
    maxWidth: "50%",
    // backgroundColor : 'yellow',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightContent: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const mapStateToProps = (state) => {
  console.log(`username : `, state);
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps)(NavigationBar);
