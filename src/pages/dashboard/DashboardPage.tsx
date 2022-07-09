import React from "react";
import { useEffect } from "react";
import AlertObjectTable from "../../lib/AlertObjectTable/AlertObjectTable";
import DashboardTableHeader from "../../lib/DashboardTableHeader/DashboardTableHeader";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import SearchPatternsHeader from "../../lib/SearchPatternsHeader/SearchPatternsHeader";
import SearchPatternsTable from "../../lib/SearchPatternTable/SearchPatternTable";
import SideSearchBar from "../../lib/SideSearchBar/SideSearchBar";
import PageTabs from "../../lib/Tabs/Tabs";
import { getAlertsList } from "../../redux/actions/AlertListAction";
import { getCustomFilterList } from "../../redux/actions/CustomFilterAction";
import { getPatternList } from "../../redux/actions/PatternAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./DashboardPage.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import { Paper } from "@mui/material";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const alertListState = useAppSelector((state) => state.alertList);

  localStorage.setItem("alertList", JSON.stringify(alertListState.alerts));

  const [isAlertTableLoading, setIsAlertTableLoading] =
    React.useState<boolean>(true);

  useEffect(() => {
    const getAlerts = async () => {
      await dispatch(getAlertsList());
      setIsAlertTableLoading(false);
    };
    dispatch(getPatternList());
    dispatch(getCustomFilterList());
    getAlerts();
  }, []);

  console.log(alertListState);

  return (
    <div id="main-page">
      <div className={styles.headerContainer}>
        <HeaderBar />
      </div>
      <div className={styles.tabsContainer}>
        <PageTabs />
      </div>
      <div className={styles.drawerContainer}>
        <SideSearchBar />
      </div>
      <div
        className={
          alertListState.isDrawerOpen
            ? styles.tableHeaderContainerOpen
            : styles.tableHeaderContainerClosed
        }
      >
        {alertListState.isDrawerOpen ? (
          <>
            <SearchPatternsHeader />
            <SearchPatternsTable />
          </>
        ) : (
          <>
            <DashboardTableHeader />
            {isAlertTableLoading ? (
              <Paper
                elevation={0}
                sx={{ width: "97.8%", ml: 2, height: 520, mt: 0.25 }}
              >
                <div className={styles.loaderContainer}>
                  <BeatLoader color={"#2196f3"} size={12} />
                </div>
              </Paper>
            ) : (
              <AlertObjectTable />
            )}
          </>
        )}
      </div>
      <div className={styles.clearDiv}></div>
      <div className={styles.footerContainer}>
        <FooterBar />
      </div>
    </div>
  );
};

export default DashboardPage;
