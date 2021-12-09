import React from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@material-ui/core";

const Dropdown = (props) => {
  return (
    <Box style={{ margin: "2px" }}>
      <InputLabel id="demo-simple-select-label">
        <Typography variant="caption">{props.labelName}</Typography>
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.selected}
        onChange={props.handleChange}
      >
        {props.values.map((val) => {
          return (
            <MenuItem key={val} value={val}>
              {val.toUpperCase()}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default Dropdown;
