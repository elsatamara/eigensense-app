import { StyleSharp } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AlertListObject from "../../lib/AlertListObject/AlertListObject";
import AlertObjectTable from "../../lib/AlertObjectTable/AlertObjectTable";
import DashboardTableHeader from "../../lib/DashboardTableHeader/DashboardTableHeader";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import SideSearchBar from "../../lib/SideSearchBar/SideSearchBar";
import PageTabs from "../../lib/Tabs/Tabs";
import { getAlertsList } from "../../redux/actions/AlertListAction";
import { addNotesAction } from "../../redux/actions/ChartActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { alertList } from "../../redux/reducers/AlertListReducer";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const alertListState = useAppSelector((state) => state.alertList);

  if (localStorage.getItem("alertList") !== null) {
    let storedAlertList = JSON.parse(localStorage.getItem("alertList")!);
    let combinedArray = storedAlertList.concat(alertListState.alerts);
    let uniqueArray = [
      ...new Map(
        combinedArray.map((item: { [x: string]: any }) => [item["_id"], item])
      ).values(),
    ];
    localStorage.setItem("alertList", JSON.stringify(uniqueArray));
  } else {
    localStorage.setItem("alertList", JSON.stringify(alertListState.alerts));
  }
  console.log(JSON.parse(localStorage.getItem("alertList")!));

  useEffect(() => {
    dispatch(getAlertsList());
  }, []);
  return (
    <div className={styles.mainPage}>
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
        <DashboardTableHeader />
        <AlertObjectTable />
      </div>

      <div className={styles.footerContainer}>
        <FooterBar />
      </div>
    </div>
  );
};

export default DashboardPage;
