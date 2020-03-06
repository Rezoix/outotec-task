import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Select,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  searchBox: {},
  inputLabel: {
    margin: theme.spacing(2, 0, 1, 0)
  }
}));

interface Props {
  setRequests: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ContentFilter: FunctionComponent<Props> = ({ setRequests }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [requestType, setRequestType] = useState("any");
  const [priority, setPriority] = useState("any");
  const [status, setStatus] = useState("any");

  useEffect(() => {
    (async () => {
      let url = "http://localhost:3001/requests";
      let edited = false;
      if (searchTerm.length !== 0) {
        url += "?term=" + searchTerm;
        edited = true;
      }
      if (requestType !== "any") {
        url += edited ? "&" : "?";
        url += "type=" + requestType;
        edited = true;
      }
      if (priority !== "any") {
        url += edited ? "&" : "?";
        url += "priority=" + priority;
        edited = true;
      }
      if (status !== "any") {
        url += edited ? "&" : "?";
        url += "status=" + status;
        edited = true;
      }

      console.log(url);
      const response = await axios.get(url);

      setRequests(response.data);
    })();
  }, [searchTerm, requestType, priority, status]);

  return (
    <>
      <TextField
        className={classes.searchBox}
        placeholder="Search"
        variant="outlined"
        color="secondary"
        label="Search"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <InputLabel className={classes.inputLabel}>Request types</InputLabel>
      <Select
        native
        value={requestType}
        variant="outlined"
        color="secondary"
        onChange={event => {
          if (typeof event.target.value === "string") {
            setRequestType(event.target.value);
          }
        }}
      >
        <option value="any">Any</option>
        <option value="audit">Audit</option>
        <option value="maintenance">Maintenance</option>
        <option value="break/fix repair">Break/Fix Repair</option>
      </Select>
      <InputLabel className={classes.inputLabel}>Priority</InputLabel>
      <Select
        native
        value={priority}
        variant="outlined"
        color="secondary"
        onChange={event => {
          if (typeof event.target.value === "string") {
            setPriority(event.target.value);
          }
        }}
      >
        <option value="any">Any</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
      <InputLabel className={classes.inputLabel}>Status</InputLabel>
      <Select
        native
        value={status}
        variant="outlined"
        color="secondary"
        onChange={event => {
          if (typeof event.target.value === "string") {
            setStatus(event.target.value);
          }
        }}
      >
        <option value="any">Any</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </Select>
    </>
  );
};
