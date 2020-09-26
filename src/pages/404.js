import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import notfoundwallpaper from "../assets/images/notfoundwallpaper.jpg";

class NotFound extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Link to="/" style={styles.link}>
          <Button style={styles.button} color="#acd6c1">BACK TO HOME</Button>
        </Link>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${notfoundwallpaper})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  button: {
    backgroundColor: "#cbe2d6",
    borderRadius: 20,
    marginTop: '28vh'
  },
  link : {
    // marginTop : '2%',
    textDecoration : 'none'
}
};
export default NotFound;
