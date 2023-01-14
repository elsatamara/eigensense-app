import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import {
  SimilarPatternAlgoInterface,
  SimilarPatternInterface,
} from "../../interfaces/SimilarPatternInterface";
import {
  getSimilarPatternDemo,
  getSimilarPatternList,
} from "../../redux/actions/SimilarPatternAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CompareAlertChart from "../CompareAlertChart/CompareAlertChart";
import CompareAlertChartHeader from "../CompareAlertChartHeader/CompareAlertChartHeader";
import CompareAlertDrawer from "../CompareAlertDrawer/CompareAlertDrawer";
import FilterDropdown from "../DashboardFilters/FilterDropdown";
import SimilarSearchPatternTable from "../SimilarSearchPatternTable/SimilarSearchPatternTable";
import styles from "./SimilarSearchWindow.module.css";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import BeatLoader from "react-spinners/BeatLoader";
import SimilarSearchPatternAlgoTable from "../SimilarSearchPatternAlgoTable/SimilarSearchPatternAlgoTable";

const SimilarSearchWindow = () => {
  const dispatch = useAppDispatch();
  const chartCSVState = useAppSelector(
    (state) => state.chartCSVList.chartCSVList
  );

  const sequence = chartCSVState.slice(0, 5000).map((elem) => {
    return elem[1];
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarPatternData = async () => {
      await dispatch(getSimilarPatternDemo(sequence));
      setIsLoading(false);
    };
    fetchSimilarPatternData();
  }, []);

  const [isCompareAlertDrawerOpen, setIsCompareAlertDrawerOpen] =
    React.useState<boolean>(false);

  const [patternToCompare, setPatternToCompare] = React.useState<
    SimilarPatternAlgoInterface[]
  >([]);

  const [currentPatternSelected, setCurrentPatternSelected] =
    React.useState<SimilarPatternAlgoInterface>();

  return (
    <div>
      <Box sx={{ mx: 1.5, p: 1, mt: 0.5, pt: 0.5, pb: 0.5 }}>
        <Paper sx={{ width: 996, p: 3 }} elevation={0}>
          <div className={styles.similarSearchWindowText}>
            <h1>Similar Search Results</h1>
          </div>

          {isCompareAlertDrawerOpen ? (
            <>
              {/* <CompareAlertChartHeader
                currentPatternSelected={currentPatternSelected!}
              /> */}
              <CompareAlertChart
                chartData={currentPatternSelected?.dataPoints}
              />
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
              {isLoading ? (
                <div className={styles.loaderContainer}>
                  <BeatLoader color={"#2196f3"} size={12} />
                </div>
              ) : (
                <SimilarSearchPatternAlgoTable
                  onCompareButtonClicked={(
                    patternPassed: SimilarPatternAlgoInterface[]
                  ) => {
                    setIsCompareAlertDrawerOpen(true);
                    setPatternToCompare(patternPassed);
                  }}
                />
              )}
            </>
          )}
        </Paper>
      </Box>
      {isCompareAlertDrawerOpen ? (
        <CompareAlertDrawer
          similarPatternList={patternToCompare}
          setPatternSelected={(pattern: SimilarPatternAlgoInterface) => {
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
