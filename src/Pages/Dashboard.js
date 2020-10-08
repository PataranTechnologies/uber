import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import sidenav from "../Images/sidenav.png";
import addbutton from "../Images/addbutton.png";
import buttonMain from "../Images/buttonMain.png";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import HomeFragment from "../Fragments/HomeFragment";
import AddMerchantFragment from "../Fragments/AddMerchantFragment";
import ResetPasswordFragment from "../Fragments/ResetPasswordFragment";
// import LogoutFragment from "../Fragments/LogoutFragment";
import LogoutModel from "../Fragments/LogoutModal";
import AllMembersFragment from "../Fragments/AllMembersFragment";
import AllMerchantsFragment from "../Fragments/AllMerchantsFragment";
import ManageMerchantFragment from "../Fragments/ManageMerchantFragment";
import './dash.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: -115,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [fragment, setfragment] = useState("HOME_FRAGMENT");

  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);


  const loadFragment = (fragment) => {
    console.log(fragment);
    switch (fragment) {
      case "HOME_FRAGMENT":
        return <HomeFragment />;
      case "RESET_PASSWORD":
        return <ResetPasswordFragment onReset={()=>{setfragment("HOME_FRAGMENT")}} />;
      case "ADD_MERCHANT":
        return <AddMerchantFragment />;
      case "ALL_MERCHANTS":
        return <AllMerchantsFragment />;
      case "ALL_MEMBERS":
        return <AllMembersFragment />;
      default:
        break;
    }
  }


  const openLogoutModal = () => {

    setIsLogoutModalActive(true)

  }


  const YesClicked = () => {
    window.location = 'https://sipcityapp.mobileprogramming.net/#/Login';
  }

  const NoClicked = () => {

    setIsLogoutModalActive(false)

  }


  return (
    <div className={classes.root}>
      <CssBaseline />


      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <img src={sidenav} className="sideNav" alt="sidenav" />

        <List>
          <ListItem button className="AddMerchantText" onClick={(e) => setfragment("ADD_MERCHANT")}>
            <img src={buttonMain} className="AddMerc" alt="buttonMain" />
          </ListItem>
          {/*<ListItem className="AddMerchantText" button onClick={(e) => setfragment("ADD_MERCHANT")} >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText secondary="Add Merchants" />
      </ListItem>*/}
      <div className={fragment==="HOME_FRAGMENT"?'selected':'hover'}>
          <ListItem button  onClick={(e) => setfragment("HOME_FRAGMENT")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText secondary="Dashboard" />
          </ListItem>
          </div>

          <div className={fragment==="ALL_MERCHANTS"?'selected':'hover'}>
          <ListItem button onClick={(e) => setfragment("ALL_MERCHANTS")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary="Merchants" />
          </ListItem>
          </div>

          <div className={fragment==="ALL_MEMBERS"?'selected':'hover'}>
          <ListItem button onClick={(e) => setfragment("ALL_MEMBERS")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText secondary="Members" />
          </ListItem>
          </div>
          <div className={fragment==="RESET_PASSWORD"?'selected':'hover'}>
          <ListItem button onClick={(e) => setfragment("RESET_PASSWORD")}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText secondary="Reset password" />
          </ListItem>
          </div>
          <ListItem button onClick={(e) => openLogoutModal()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText secondary="Logout" />
          </ListItem>
        </List>
      </Drawer >
      <main className={classes.content}>
        {loadFragment(fragment)}
      </main>
      {
        isLogoutModalActive ? <LogoutModel
          show={isLogoutModalActive}
          onYesClick={() => { YesClicked() }}
          onNoClick={() => { NoClicked() }}
        /> : null

      }
    </div >
  );
}