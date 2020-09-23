import React from "react";
import {
    Paper,
  } from "@material-ui/core";

class DashboardPage extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <h1>Dashboard Page</h1>
        </Paper>
      </div>
    );
  }
}

const styles = {
};

export default DashboardPage;
