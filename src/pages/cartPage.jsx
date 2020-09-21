// import component
import React, { Component } from "react";
import Wallpaper from '../assets/images/Wallpaper.jpg'

class CartPage extends Component {
  render() {
    return (
      <div style={styles.root}>
        <h1>Cart Page</h1>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "auto",
    minHeight: "100vh",
    backgroundImage: `url(${Wallpaper})`,
    padding: "90px 10% 3% 10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
};

export default CartPage;
