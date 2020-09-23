import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import {LogOut} from '../actions/userAction'

// class component
class DrawerComp extends React.Component {

  handleLogOut = () => {
    this.props.LogOut()
  }

  render() {
    return (
      <div style={styles.root}>
        <Drawer
          //   style={styles.drawer}
          variant="permanent"
        >
          <Toolbar />
          <div style={styles.drawerContainer}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Dashboard"}>
                  <ListItemIcon>
                    <DashboardIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} style={{ color: 'black' }} />
                </ListItem>
              </List>
            </Link>
            <Link to="/salesReport" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Sales Report"}>
                  <ListItemIcon>
                    <MonetizationOnIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Sales Report"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
            <Link to="/userInfo" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Users"}>
                  <ListItemIcon>
                    <AccountCircleIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
            <Link to="/productPage" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Product"}>
                  <ListItemIcon>
                    <FormatListBulletedIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Product"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
            <Link to="/packagePage" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Packages"}>
                  <ListItemIcon>
                    <CardGiftcardIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Packages"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
            <Link to="/historyTrans" style={{ textDecoration: 'none' }}>
              <List>
                <ListItem button key={"Payment"}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon style={{ color: "#04FCF8" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Payment"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <List onClick={this.handleLogOut}>
                <ListItem button key={"LogOut"}>
                  <ListItemIcon>
                    <MeetingRoomIcon style={{ color: "#04FCF8" }}/>
                  </ListItemIcon>
                  <ListItemText primary={"LogOut"} style={{ color: 'black' }}/>
                </ListItem>
              </List>
            </Link>
          </div>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
  },
  drawer: {
    width: 300,
    flexShrink: 0,
    backgroundColor: "salmon",
  },
  drawerPaper: {
    width: 300,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
};

export default connect(null, {LogOut})(DrawerComp);
