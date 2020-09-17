// import component
import React, { Component } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
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
      <div style={styles.root}>
        <h1>Profile</h1>
      </div>
    );
  }
}

const styles = {
  root: {
    marginTop: 50,
    backgroundColor: "ghostwhite",
    height: "100vh",
  },
};

export default ProfilePage;
