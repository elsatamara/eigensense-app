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

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const alertListState = useAppSelector((state) => state.alertList);
  const customFilterListState = useAppSelector(
    (state) => state.customFilterList.customFilterList
  );

  localStorage.setItem("alertList", JSON.stringify(alertListState.alerts));
  sessionStorage.setItem(
    "customFilterList",
    JSON.stringify(customFilterListState)
  );
  useEffect(() => {
    dispatch(getAlertsList());
    dispatch(getPatternList());
    dispatch(getCustomFilterList());
  }, []);

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
            <AlertObjectTable />
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
