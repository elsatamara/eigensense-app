import { Box, Button, Paper, Tab, Tabs } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ViewsDatePicker from "../CalendarPicker/CalendarPicker";
import styles from "./DashboardTableHeader.module.css";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

interface FilterProps {
  filters: Set<string>;
  header: string;
}

const AlertStatusDropdown = () => {
  return (
    <form>
      <select>
        <option>Alert Status</option>
      </select>
    </form>
  );
};

const SavedFilterDropdown = () => {
  return (
    <form>
      <select>
        <option>Saved Filter</option>
      </select>
    </form>
  );
};

const FilterDropdown = ({ filters, header }: FilterProps) => {
  return (
    <form>
      <select id={header} onChange={() => {}}>
        <option>{header}</option>
        {[...filters].map((elem) => {
          return <option>{elem}</option>;
        })}
      </select>
    </form>
  );
};

const MoreFilterPicker = () => {
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  const locations: Set<string> = new Set();
  const regulators: Set<string> = new Set();
  const agents: Set<string> = new Set();
  const alertQueues: Set<string> = new Set();
  const alertStatus: Set<string> = new Set();
  alertListState.forEach((elem) => {
    locations.add(elem.location);
    regulators.add(elem.regulator);
    agents.add(elem.agentName);
    alertQueues.add(elem.alertQueue);
  });
  return (
    <Box p={2} pt={0} pb={0.25}>
      <Paper
        sx={{ height: "90px", alignContent: "center", display: "flex" }}
        elevation={0.5}
      >
        <div className={styles.dropdownsContainer}>
          <FilterDropdown filters={locations} header={"Location"} />
          <FilterDropdown filters={regulators} header={"Regulator"} />
          <FilterDropdown filters={agents} header={"Agent"} />
          <FilterDropdown filters={alertQueues} header={"Alert Queue"} />
          <AlertStatusDropdown />
          <SavedFilterDropdown />
          <Button>
            <CachedOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
            Reset All Filters
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

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
              <ViewsDatePicker />
              <Button
                id="moreFilter"
                onClick={() => {
                  setMoreFilters(!moreFilters);
                }}
                sx={{ ml: 3 }}
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
