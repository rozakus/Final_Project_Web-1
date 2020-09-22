import React from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Wallpaper from '../assets/images/Wallpaper.jpg'

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/users`)
      .then((res) => {
        console.log(` users data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in UserInfo : `, err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
      <TableCell>No</TableCell>
        <TableCell>ID-Users</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Email</TableCell>
        {/* <TableCell>Address</TableCell> */}
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.data.map((item, index) => {
        return (
            <TableRow key={index}>
                <TableCell>{index+ 1}</TableCell>
                <TableCell>{item.id_users}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
            </TableRow>
        )
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3}>
          <h1>Users Info</h1>
          <Table>
                <TableHead>
                    {this.renderTableHead()}
                </TableHead>
                <TableBody>
                    {this.renderTableBody()}
                </TableBody>
            </Table>
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
};

export default UserInfo;
