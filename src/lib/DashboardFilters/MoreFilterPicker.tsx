import { Box, Paper, Button } from "@mui/material";
import React from "react";
import { getAlertsList } from "../../redux/actions/AlertListAction";
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
  //TODO: FETCH SAVED FILTER
  const savedFilter = ["Apple", "Oranges", "Boba"];
  return (
    <Box p={2} pt={0} pb={0.25}>
      <Paper
        sx={{
          height: "80px",
          alignContent: "center",
          display: "flex",
          minWidth: "1300px",
        }}
        elevation={0}
      >
        <div className={styles.dropdownsContainer}>
          <FilterDropdown header={"Location"} />
          <FilterDropdown header={"Regulator"} />
          <FilterDropdown header={"Agent"} />
          <FilterDropdown header={"Queue"} />
          <FilterDropdown header={"Status"} />
          <FilterDropdown header={"Saved Filter"} />
          <Button
            id="resetFilter"
            onClick={() => {
              dispatch(getAlertsList());
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
