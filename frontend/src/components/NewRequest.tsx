import React, { FunctionComponent, useEffect } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  searchBox: {}
}));

export const NewRequest: FunctionComponent = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    //Make call to fetch data and use setRequests
  }, [searchTerm]);

  return <></>;
};
