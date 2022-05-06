import { Box, Paper } from "@mui/material";
import React from "react";
import styles from "./SearchPatternsHeader.module.css";

const SearchPatternsHeader = () => {
  return (
    <div>
      <Box pt={2} pb={0.25}>
        <Paper
          elevation={0}
          sx={{ height: "70px", m: 1.5, minWidth: "1000px" }}
        >
          <div className={styles.headerContainer}>
            <h2>Search Results</h2>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default SearchPatternsHeader;
