import React, { FunctionComponent, useState } from "react";
import axios from "axios";
import {
  TextField,
  Grid,
  Drawer,
  Typography,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Divider,
  Button,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    flexGrow: 1
  },
  drawerContent: {
    padding: theme.spacing(1, 2, 1, 2),
    flexGrow: 1
  },
  title: {
    fontWeight: 500,
    margin: theme.spacing(12, 5, 3, 0)
  },
  inputLabel: {
    margin: theme.spacing(2, 0, 1, 0)
  },
  bottomContainer: {
    padding: theme.spacing(1, 2, 1, 2)
  },
  alert: {}
}));

type PayloadObject = {
  name: string;
  type: string;
  id: string;
  description: string;
  priority: string;
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewRequest: FunctionComponent<Props> = ({
  open,
  setOpen,
  update,
  setUpdate
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("any");
  const [priority, setPriority] = useState("any");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [sendPressed, setSendPressed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => {
    setName("");
    setRequestType("any");
    setPriority("any");
    setId("");
    setDescription("");
    setSendPressed(false);
    setOpen(false);
  };

  const url = "http://localhost:3001/requests/new";

  const handleSend = () => {
    const payload: PayloadObject = {
      name: name,
      type: requestType,
      id: id,
      description: description.length === 0 ? "" : description,
      priority: priority
    };

    if (
      payload.name.length === 0 ||
      payload.type === "any" ||
      payload.id.length === 0 ||
      payload.priority === "any"
    ) {
      setSendPressed(true);
      return;
    }

    axios.put(url, payload).catch(e => {
      console.log("Error: Failed to create new request");
      console.log(e);
      return;
    });
    setUpdate(!update);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleSnackbarClose}
        onClick={handleSnackbarClose}
      >
        <Alert severity="success">Request created successfully</Alert>
      </Snackbar>
      <Drawer
        open={open}
        anchor="right"
        variant="persistent"
        className={classes.drawer}
      >
        <Grid container direction="column" className={classes.drawerContent}>
          <Typography variant="h5" className={classes.title}>
            CREATE NEW SERVICE REQUEST
          </Typography>

          <InputLabel className={classes.inputLabel}>Request name</InputLabel>
          <FormControl required error={name.length === 0 && sendPressed}>
            <TextField
              placeholder="Request name"
              variant="outlined"
              color="secondary"
              error={name.length === 0 && sendPressed}
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <InputLabel className={classes.inputLabel}>Request types</InputLabel>
          <FormControl required error={requestType === "any" && sendPressed}>
            <Select
              native
              variant="outlined"
              color="secondary"
              value={requestType}
              onChange={event => {
                if (typeof event.target.value === "string") {
                  setRequestType(event.target.value);
                }
              }}
            >
              <option value="any">Select</option>
              <option value="Audit">Audit</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Break/Fix Repair">Break/Fix Repair</option>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <InputLabel className={classes.inputLabel}>ID</InputLabel>
          <FormControl required error={id.length === 0 && sendPressed}>
            <TextField
              placeholder="ID"
              variant="outlined"
              color="secondary"
              error={id.length === 0 && sendPressed}
              value={id}
              onChange={event => setId(event.target.value)}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <InputLabel className={classes.inputLabel}>Description</InputLabel>
          <FormControl>
            <TextField
              placeholder="Description"
              variant="outlined"
              color="secondary"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </FormControl>

          <InputLabel className={classes.inputLabel}>Priority</InputLabel>
          <FormControl required error={priority === "any" && sendPressed}>
            <Select
              native
              variant="outlined"
              color="secondary"
              value={priority}
              onChange={event => {
                if (typeof event.target.value === "string") {
                  setPriority(event.target.value);
                }
              }}
            >
              <option value="any">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Divider />
        <Grid
          container
          direction="row"
          justify="flex-end"
          className={classes.bottomContainer}
        >
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Drawer>
    </>
  );
};
