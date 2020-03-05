import React, { useState, FunctionComponent } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Box,
  Drawer,
  IconButton,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { ContentFilter } from "./ContentFilter";

const drawerWidth = "18%";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      flexGrow: 1
    },
    drawerOpen: {
      width: drawerWidth
    },
    drawerClosed: {
      width: "4%"
    },
    drawerContent: {
      display: "flex",
      padding: theme.spacing(1, 1, 1, 1)
    },
    drawerToggle: {
      margin: theme.spacing(8, 0, 0, 0),
      alignSelf: "flex-end"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: drawerWidth
    },
    contentShift: {
      marginLeft: "4%"
    },
    contentTop: {
      display: "flex"
    },
    contentTitle: {
      fontWeight: 500,
      padding: theme.spacing(1, 1, 1, 1)
    },
    contentSub: {},
    newServiceButton: {
      margin: theme.spacing(1, 1, 1, 1),
      alignSelf: "flex-end"
    },
    table: {
      width: "82%"
    },
    tableShift: {
      width: "96%"
    }
  })
);

type Request = {
  created: Date;
  name: string;
  type: string;
  id: string;
  description: string;
  priority: string;
  status: string;
};

export const Content: FunctionComponent = () => {
  const classes = useStyles();

  const [requests, setRequests] = React.useState<Request[]>([]);
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNewServiceClick = () => {
    console.log("jee");
  };

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClosed]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClosed]: !open
          })
        }}
      >
        <Grid container direction="column" className={classes.drawerContent}>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.drawerToggle}
          >
            {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          {open === true ? (
            <>
              <ContentFilter setRequests={setRequests} />
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Drawer>
      <Grid
        container
        direction="column"
        className={clsx(classes.content, {
          [classes.contentShift]: !open
        })}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.contentTop}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5" className={classes.contentTitle}>
            Service requests
          </Typography>
          <Typography variant="body2" className={classes.contentSub}>
            Service Center / Service requests
          </Typography>
          <Button
            className={classes.newServiceButton}
            variant="contained"
            color="secondary"
            onClick={handleNewServiceClick}
          >
            NEW SERVICE REQUEST
          </Button>
        </Grid>

        <Divider />
        <TableContainer>
          <Table
            className={clsx(classes.table, {
              [classes.tableShift]: !open
            })}
          >
            <TableHead>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell>Request name</TableCell>
                <TableCell>Request type</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request: Request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.created}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>{request.priority}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
