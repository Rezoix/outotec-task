import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  searchBox: {}
}));

interface Props {
  setRequests: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchBox: FunctionComponent<Props> = ({ setRequests }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const url = "http://localhost:3001/requests";

  useEffect(() => {
    (async () => {
      const response = await axios.get(url);

      console.log(response.data);
      setRequests(response.data);
    })();
  }, [searchTerm]);

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
    </>
  );
};
