import React from "react";
import { Link } from "react-router-dom";

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

// class component
class DrawerComp extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Drawer
          //   style={styles.drawer}
          variant="permanent"
        >
          <Toolbar />
          <div style={styles.drawerContainer}>
            <Link to="/dashboard">
              <List>
                <ListItem button key={"Dashboard"}>
                  <ListItemIcon>
                    <DashboardIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItem>
              </List>
            </Link>
            <Link to="/salesReport">
              <List>
                <ListItem button key={"Sales Report"}>
                  <ListItemIcon>
                    <MonetizationOnIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Sales Report"} />
                </ListItem>
              </List>
            </Link>
            <Link to="/userInfo">
              <List>
                <ListItem button key={"Users"}>
                  <ListItemIcon>
                    <AccountCircleIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItem>
              </List>
            </Link>
            <Link to="/productPage">
              <List>
                <ListItem button key={"Product"}>
                  <ListItemIcon>
                    <FormatListBulletedIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Product"} />
                </ListItem>
              </List>
            </Link>
            <Link to="/packagePage">
              <List>
                <ListItem button key={"Packages"}>
                  <ListItemIcon>
                    <CardGiftcardIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Packages"} />
                </ListItem>
              </List>
            </Link>
            <Link to="/historyTrans">
              <List>
                <ListItem button key={"Payment"}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon style={{ color: "#cbe2d6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Payment"} />
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

export default DrawerComp;
