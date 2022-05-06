import { Tab } from "@mui/material";
import React from "react";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import styles from "./NotificationPage.module.css";

const NotificationPage = () => {
  return (
    <div id="notification-page-main">
      <HeaderBar />
      <div className={styles.notificationTabContainer}>
        <Tab label="Notifications" sx={{ mt: 8.5 }} />
      </div>
      <FooterBar />
    </div>
  );
};

export default NotificationPage;
