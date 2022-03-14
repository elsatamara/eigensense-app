import { Box, Paper } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import styles from "./DashboardTableHeader.module.css";

const DashboardTableHeader = () => {
  const alertListState = useAppSelector((state) => state.alertList);
  return (
    <Box p={2}>
      <Paper>
        <div className={styles.headerContainer}>
          <div>
            <h2>SEARCH RESULTS</h2>
          </div>
          <div className={styles.resultContainer}>
            {alertListState.alerts.length} Results
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default DashboardTableHeader;
