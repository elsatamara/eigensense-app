import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { SimilarPatternInterface } from "../../interfaces/SimilarPatternInterface";
import { getSimilarPatternList } from "../../redux/actions/SimilarPatternAction";
import { useAppDispatch } from "../../redux/hooks";
import CompareAlertChart from "../CompareAlertChart/CompareAlertChart";
import CompareAlertChartHeader from "../CompareAlertChartHeader/CompareAlertChartHeader";
import CompareAlertDrawer from "../CompareAlertDrawer/CompareAlertDrawer";
import FilterDropdown from "../DashboardFilters/FilterDropdown";
import SimilarSearchPatternTable from "../SimilarSearchPatternTable/SimilarSearchPatternTable";
import styles from "./SimilarSearchWindow.module.css";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const SimilarSearchWindow = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSimilarPatternList());
  }, []);
  const [isCompareAlertDrawerOpen, setIsCompareAlertDrawerOpen] =
    React.useState<boolean>(false);

  const [patternToCompare, setPatternToCompare] = React.useState<
    SimilarPatternInterface[]
  >([]);

  const [currentPatternSelected, setCurrentPatternSelected] =
    React.useState<SimilarPatternInterface>();

  return (
    <div>
      <Box sx={{ mx: 1.5, p: 1, mt: 0.5, pt: 0.5, pb: 0.5 }}>
        <Paper sx={{ width: 996, p: 3 }} elevation={0}>
          <div className={styles.similarSearchWindowText}>
            <h1>Similar Search Results</h1>
          </div>

          {isCompareAlertDrawerOpen ? (
            <>
              <CompareAlertChartHeader
                currentPatternSelected={currentPatternSelected!}
              />
              <CompareAlertChart />
            </>
          ) : (
            <>
              <div className={styles.dropdownsContainer}>
                <FilterDropdown header={"Location"} isSimilarPatternFilter />
                <FilterDropdown header={"Regulator"} isSimilarPatternFilter />
                <FilterDropdown header={"Match Score"} isSimilarPatternFilter />
                <FilterDropdown header={"Algorithm"} isSimilarPatternFilter />
                <Button
                  id="resetFilter"
                  onClick={() => {
                    dispatch(getSimilarPatternList());
                  }}
                >
                  <CachedOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Reset All Filters
                </Button>
              </div>
              <SimilarSearchPatternTable
                onCompareButtonClicked={(
                  patternPassed: SimilarPatternInterface[]
                ) => {
                  setIsCompareAlertDrawerOpen(true);
                  setPatternToCompare(patternPassed);
                }}
              />
            </>
          )}
        </Paper>
      </Box>
      {isCompareAlertDrawerOpen ? (
        <CompareAlertDrawer
          similarPatternList={patternToCompare}
          setPatternSelected={(pattern: SimilarPatternInterface) => {
            setCurrentPatternSelected(pattern);
          }}
          closeDrawer={() => {
            setIsCompareAlertDrawerOpen(false);
            setCurrentPatternSelected(undefined);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SimilarSearchWindow;