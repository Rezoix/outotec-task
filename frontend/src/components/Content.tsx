import React, { useState, FunctionComponent } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Drawer,
  IconButton,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { ContentFilter } from "./ContentFilter";
import { NewRequest } from "./NewRequest";

const drawerWidth = "18%";
const rowsPerPage = 10;

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

  const [requests, setRequests] = useState<Request[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [requestOpen, setRequestOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [update, setUpdate] = useState(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, requests.length - page * rowsPerPage);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNewServiceClick = () => {
    setRequestOpen(true);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  interface PaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  const tableActionsComponent = (props: PaginationProps) => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };

    const handleLastClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };

    const handleForwardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };

    return (
      <>
        <IconButton onClick={handleFirstClick} disabled={page === 0}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handleBackClick} disabled={page === 0}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleForwardClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          <LastPageIcon />
        </IconButton>
      </>
    );
  };

  return (
    <>
      <NewRequest
        open={requestOpen}
        setOpen={setRequestOpen}
        update={update}
        setUpdate={setUpdate}
      />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClosed]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClosed]: !drawerOpen
          })
        }}
      >
        <Grid container direction="column" className={classes.drawerContent}>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.drawerToggle}
          >
            {drawerOpen === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          {drawerOpen === true ? (
            <>
              <ContentFilter setRequests={setRequests} update={update} />
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
          [classes.contentShift]: !drawerOpen
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
              [classes.tableShift]: !drawerOpen
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
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request: Request) => (
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  count={requests.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handlePageChange}
                  ActionsComponent={tableActionsComponent}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
