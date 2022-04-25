import { Box, Paper, Button } from "@mui/material";
import React from "react";
import { resetAlertList } from "../../redux/actions/AlertListAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import styles from "./AllFilters.module.css";
import FilterDropdown from "./FilterDropdown";

const AlertStatusDropdown = () => {
  return (
    <form>
      <select>
        <option>Alert Status</option>
      </select>
    </form>
  );
};

const MoreFilterPicker = () => {
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  const dispatch = useAppDispatch();
  const locations: Set<string> = new Set();
  const regulators: Set<string> = new Set();
  const agents: Set<string> = new Set();
  const alertQueues: Set<string> = new Set();
  const alertStatus: Set<string> = new Set();
  //TODO: FETCH SAVED FILTER
  const savedFilter = ["Apple", "Oranges", "Boba"];
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
        elevation={0}
      >
        <div className={styles.dropdownsContainer}>
          <FilterDropdown filters={locations} header={"Location"} />
          <FilterDropdown filters={regulators} header={"Regulator"} />
          <FilterDropdown filters={agents} header={"Agent"} />
          <FilterDropdown filters={alertQueues} header={"Alert Queue"} />
          <AlertStatusDropdown />
          <FilterDropdown filters={savedFilter} header={"Saved Filter"} />
          <Button
            id="resetFilter"
            onClick={() => {
              dispatch(
                resetAlertList(JSON.parse(localStorage.getItem("alertList")!))
              );
            }}
          >
            <CachedOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
            Reset All Filters
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default MoreFilterPicker;
