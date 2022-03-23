import { alertTitleClasses } from "@mui/material";
import React from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import NextPreviousAlertButton from "../../lib/NextPreviousAlertButton/NextPreviousAlertButton";
import RecentlyViewedTable from "../../lib/RecentlyViewedTable/RecentlyViewedTable";
import SingleAlertPageHeader from "../../lib/SingleAlertPageHeader/SingleAlertPageHeader";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SingleAlertPage.module.css";

const SingleAlertPage = () => {
  const alertListStored = JSON.parse(localStorage.getItem("alertList")!);
  const alertObjectIndex = alertListStored.findIndex(
    (alert: { patternId: string }) =>
      alert.patternId ===
      window.location.href.substring(window.location.href.length - 5)
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

  return (
    <div className={styles.mainPage}>
      <HeaderBar />
      <div className={styles.pageHeaderContainer}>
        <SingleAlertPageHeader
          regulatorName={alertObject.regulator}
          location={alertObject.location}
        />
        <NextPreviousAlertButton previous={prevAlert} next={nextAlert} />
      </div>
      <div className={styles.chartTableContainer}>
        <RecentlyViewedTable />
      </div>
      <FooterBar />
    </div>
  );
};

export default SingleAlertPage;
