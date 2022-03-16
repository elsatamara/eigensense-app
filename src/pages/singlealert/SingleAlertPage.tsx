import React from "react";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import NextPreviousAlertButton from "../../lib/NextPreviousAlertButton/NextPreviousAlertButton";
import SingleAlertPageHeader from "../../lib/SingleAlertPageHeader/SingleAlertPageHeader";
import styles from "./SingleAlertPage.module.css";

const SingleAlertPage = () => {
  return (
    <div className={styles.mainPage}>
      <div>
        <HeaderBar />
      </div>
      <SingleAlertPageHeader regulatorName="aaaa" location="seattle" />
      <NextPreviousAlertButton />
      <FooterBar />
    </div>
  );
};

export default SingleAlertPage;
