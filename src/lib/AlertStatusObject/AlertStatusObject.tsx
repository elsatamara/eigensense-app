import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { AlertStatus } from "../../utils/AlertStatus";
import styles from "./AlertStatusObject.module.css";

interface Props {
  alertStatus: string;
}

const AlertStatusObject = ({ alertStatus }: Props) => {
  if (alertStatus === AlertStatus.Pending) {
    return (
      <div className={styles.pendingIcon}>
        <CircleIcon sx={{ color: "#00FF00", mr: 1 }} fontSize="small" />
        Pending
      </div>
    );
  } else if (alertStatus == AlertStatus.InReview) {
    return (
      <div className={styles.inreviewIcon}>
        <CircleIcon sx={{ color: "#0047AB" }} />
        In Review
      </div>
    );
  } else if (alertStatus == AlertStatus.Closed) {
    return (
      <div className={styles.closedIcon}>
        <CircleIcon sx={{ color: "#FF0000" }} />
        Closed
      </div>
    );
  } else {
    return (
      <div className={styles.suppressedIcon}>
        <CircleIcon sx={{ color: "#FFFF00" }} />
        Suppressed
      </div>
    );
  }
};

export default AlertStatusObject;
