import { alertTitleClasses, Box, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import ChartSingleAlert from "../../lib/ChartSingleAlert/ChartSingleAlert";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import NavigatorRemote from "../../lib/NavigatorRemote/NavigatorRemote";
import NavigatorRemoteDemo from "../../lib/NavigatorRemote/NavigatorRemoteDemo";
import NextPreviousAlertButton from "../../lib/NextPreviousAlertButton/NextPreviousAlertButton";
import NotesTable from "../../lib/NotesTable/NotesTable";
import RecentlyViewedTable from "../../lib/RecentlyViewedTable/RecentlyViewedTable";
import SimilarSearchWindow from "../../lib/SimilarSearchWindow/SimilarSearchWindow";
import SingleAlertChartHeader from "../../lib/SingleAlertChartHeader/SingleAlertChartHeader";
import SingleAlertPageHeader from "../../lib/SingleAlertPageHeader/SingleAlertPageHeader";
import PageTabs from "../../lib/Tabs/Tabs";
import { getChartDataAction } from "../../redux/actions/ChartActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./SingleAlertPage.module.css";

const SingleAlertPage = () => {
  const alertListStored = JSON.parse(localStorage.getItem("alertList")!);
  let patternId = window.location.href.substring(
    window.location.href.length - 5
  );
  const alertObjectIndex = alertListStored.findIndex(
    (alert: { patternId: string }) => alert.patternId === patternId
  );
  const alertObject: AlertInterface = alertListStored[alertObjectIndex];

  alertObject.dateLastOpened = new Date();

  if (localStorage.getItem("recentlyViewed") == null) {
    let set = new Set();
    set.add(alertObject);
    console.log(set);
    localStorage.setItem("recentlyViewed", JSON.stringify(Array.from(set)));
  } else {
    let storedRecentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed")!
    );
    storedRecentlyViewed.push(alertObject);
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify([
        ...new Map(
          storedRecentlyViewed.map((item: { [x: string]: any }) => [
            item["patternId"],
            item,
          ])
        ).values(),
      ])
    );
  }

  const prevAlert: AlertInterface = alertListStored[alertObjectIndex - 1];
  const nextAlert: AlertInterface = alertListStored[alertObjectIndex + 1];

  const [runSimilarSearch, setRunSimilarSearch] =
    React.useState<boolean>(false);

  return (
    <div className={styles.mainPage}>
      <HeaderBar />
      <div className={styles.tabsContainer}>
        <PageTabs />
      </div>
      <div className={styles.columnContainer}>
        <div className={styles.rightColumnContainer}>
          <SingleAlertPageHeader
            regulatorName={alertObject.regulator}
            location={alertObject.location}
          />
          <SingleAlertChartHeader
            alertType={alertObject.alertType}
            keyAttributes={alertObject.keyAttribute}
            date={new Date(alertObject.date)}
            runSimilarSearch={() => {
              setRunSimilarSearch(!runSimilarSearch);
            }}
          />
          <ChartSingleAlert />
          {runSimilarSearch ? <SimilarSearchWindow /> : <></>}
          <NavigatorRemoteDemo />
          <div className={styles.clearDiv}></div>
        </div>
        <div className={styles.chartTableContainer}>
          <NextPreviousAlertButton previous={prevAlert} next={nextAlert} />
          <RecentlyViewedTable />
          <NotesTable patternId={patternId} />
        </div>
      </div>
      <FooterBar />
    </div>
  );
};

export default SingleAlertPage;
