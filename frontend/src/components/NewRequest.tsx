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
  Button
} from "@material-ui/core";
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
  }
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
}

export const NewRequest: FunctionComponent<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("any");
  const [priority, setPriority] = useState("any");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setName("");
    setRequestType("any");
    setPriority("any");
    setId("");
    setDescription("");
    setOpen(false);
  };

  const url = "http://localhost:3001/requests/new";

  const handleSend = () => {
    const payload: PayloadObject = {
      name: name,
      type: requestType,
      id: id,
      description: description,
      priority: priority
    };

    axios.put(url, payload);
  };

  return (
    <>
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
          <FormControl required error>
            <TextField
              placeholder="Request name"
              variant="outlined"
              color="secondary"
              error
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <InputLabel className={classes.inputLabel}>Request types</InputLabel>
          <FormControl required error>
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
              <option value="audit">Audit</option>
              <option value="maintenance">Maintenance</option>
              <option value="break/fix repair">Break/Fix Repair</option>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <InputLabel className={classes.inputLabel}>ID</InputLabel>
          <FormControl required error>
            <TextField
              placeholder="ID"
              variant="outlined"
              color="secondary"
              error
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
          <FormControl required error>
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
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
