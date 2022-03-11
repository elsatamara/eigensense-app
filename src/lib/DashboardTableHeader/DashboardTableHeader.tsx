import { Box, Paper } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import styles from "./DashboardTableHeader.module.css";

const DashboardTableHeader = () => {
  const alertListState = useAppSelector((state) => state.alertList);
  return (
    <Box p={5}>
      <Paper>
        <div className={styles.headerContainer}>
          <div>Search Results</div>
          <div>{alertListState.alerts.length} Results</div>
        </div>
      </Paper>
    </Box>
  );
};

export default DashboardTableHeader;
