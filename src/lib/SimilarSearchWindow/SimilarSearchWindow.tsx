import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { getSimilarPatternList } from "../../redux/actions/SimilarPatternAction";
import { useAppDispatch } from "../../redux/hooks";
import FilterDropdown from "../DashboardFilters/FilterDropdown";
import SimilarSearchPatternTable from "../SimilarSearchPatternTable/SimilarSearchPatternTable";
import styles from "./SimilarSearchWindow.module.css";

const SimilarSearchWindow = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSimilarPatternList());
  }, []);
  return (
    <div>
      <Box sx={{ mx: 1.5, p: 1, mt: 0.5, pt: 0.5, pb: 0.5 }}>
        <Paper sx={{ width: 996, p: 3 }} elevation={0}>
          <div className={styles.similarSearchWindowText}>
            <h1>Similar Search Results</h1>
          </div>
          <FilterDropdown header={"Location"} />
          <FilterDropdown header={"Regulator"} />
          <FilterDropdown header={"Match Score"} />
          <FilterDropdown header={"Algorithm"} />
          <SimilarSearchPatternTable />
        </Paper>
      </Box>
    </div>
  );
};

export default SimilarSearchWindow;
