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
  searchBox: {}
}));

interface Props {
  setRequests: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ContentFilter: FunctionComponent<Props> = ({ setRequests }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [requestType, setRequestType] = useState("any");

  useEffect(() => {
    (async () => {
      let url = "http://localhost:3001/requests";
      if (searchTerm.length !== 0) {
        url += "?term=" + searchTerm;
      }
      if (requestType !== "any") {
        url += "?type=" + requestType;
      }
      console.log(url);
      const response = await axios.get(url);

      setRequests(response.data);
    })();
  }, [searchTerm, requestType]);

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
      <InputLabel>Request types</InputLabel>
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
        name="age"
      >
        <option value="any">Any</option>
        <option value="audit">Audit</option>
        <option value="maintenance">Maintenance</option>
        <option value="break/fix repair">Break/Fix Repair</option>
      </Select>
    </>
  );
};
