import React, { FunctionComponent } from "react";
import {
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  createStyles
} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { Content } from "./components/Content";

import logo from "./assets/images/outotec-logo.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "fixed"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    title: {
      fontWeight: 500,
      flexGrow: 1
    },
    logoIcon: {
      width: "8%",
      margin: "0 2% 0 0"
    },
    avatar: {
      margin: "1%"
    }
  })
);

export const App: FunctionComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("index");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img className={classes.logoIcon} src={logo} />
          <Typography variant="h5" className={classes.title}>
            Service Center
          </Typography>

          <Divider orientation="vertical" flexItem />
          <Avatar className={classes.avatar}>
            <PersonOutlineIcon />
          </Avatar>
          <Typography>Username</Typography>
        </Toolbar>
      </AppBar>
      <Content />
    </div>
  );
};
