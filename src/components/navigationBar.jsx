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
      <AppBar position="fixed" style={styles.root} elevation={3}>
        <Toolbar style={styles.toolbar}>
          <div style={styles.leftContent}>
            <Link to="/" style={styles.link}>
              <Typography variant="h6">Home</Typography>
            </Link>
          </div>
          <div style={styles.rightContent}>
          <Link to="/profile" style={styles.link}>
              <Typography variant="h6" style={{ marginRight: 10 }}>
                Profile
              </Typography>
            </Link>
            <Link to="/cart" style={styles.link}>
              <Typography variant="h6" style={{ marginRight: 10 }}>
                Cart
              </Typography>
            </Link>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => this.handleClick(event)}
            >
              {/* <Avatar
            alt="Travis Howard"
            src={`https://api.adorable.io/avatars/285/${this.props.nama}.png`}
          ></Avatar> */}
              <Avatar src="/broken-image.jpg" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Link to="/login">
                <MenuItem>Login</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    height: 50,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    // backgroundColor: 'ghostwhite'
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
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

export default NavigationBar;
