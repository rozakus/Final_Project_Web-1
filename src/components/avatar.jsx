import React from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogOut, SignIn } from "../actions/";

class AvatarProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = (event) => {
    console.log(event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout = () => {
    this.props.LogOut();
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => this.handleClick(event)}
        >
          {this.props.username ? (
            <Avatar
              alt="img"
              src={"http://localhost:2000/" + this.props.picture}
            />
          ) : (
            <Avatar>U</Avatar>
          )}
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
          {this.props.role === "user" ? (
            <>
              <Link to="/profile" style={styles.linklink}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link to="/cart" style={styles.linklink}>
                <MenuItem>Cart</MenuItem>
              </Link>
              <Link to="/historyUser" style={styles.linklink}>
                <MenuItem>History</MenuItem>
              </Link>
              <Link to="/" style={styles.linklink}>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/historytransaction">
                <MenuItem>Transaction History</MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </div>
    );
  }
}

const styles = {
  linklink: {
    textDecoration: "none",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    role: state.userReducer.role,
    picture: state.userReducer.picture,
  };
};

export default connect(mapStateToProps, { LogOut, SignIn })(AvatarProfile);
