import { Box, Button, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import AlertTypeFilter from "../DashboardFilters/AlertTypeFilter";
import MoreFilterPicker from "../DashboardFilters/MoreFilterPicker";
import styles from "./DashboardTableHeader.module.css";

const DashboardTableHeader = () => {
  const [moreFilters, setMoreFilters] = React.useState(false);
  return (
    <div>
      <Box p={2} pb={0.25}>
        <Paper elevation={0}>
          <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
              <Tabs>
                <Tab label="ALERT MANAGEMENT" />
                <Tab label="FLAGGED PATTERNS" />
              </Tabs>
            </div>
            <div className={styles.rightHeader}>
              <CalendarPicker />
              <AlertTypeFilter />
              <Button
                id="moreFilter"
                onClick={() => {
                  setMoreFilters(!moreFilters);
                }}
                sx={{ ml: 3, color: "black" }}
              >
                More filters
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
      {moreFilters ? <MoreFilterPicker /> : <></>}
    </div>
  );
};

export default DashboardTableHeader;
