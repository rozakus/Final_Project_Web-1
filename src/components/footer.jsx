// import
import React from "react";

// import UI
import { Typography } from "@material-ui/core";

// class component
class Footer extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Typography>
          Copyright 2020 © Frengky Sihombing, Abdul Rozak, Ade Nugrah Herman
          Tammu.
        </Typography>
        <Typography>
          Product Image belong to indomaret, tokopedia, and other site.
        </Typography>
      </div>
    );
  }
}

const styles = {
  root: {
    // height: 300,
    // width: '100vw',
    // backgroundColor: 'whitesmoke',
    // padding: 10,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // // color: 'white',
    height: 70,
    width: "100%",
    backgroundColor: "#cbe2d6",
    padding: "2% 7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Footer;
