import { Box, Button, Paper } from "@mui/material";
import React from "react";
import {
  deleteNotificationDb,
  deleteNotificationRedux,
  markReadDb,
  markReadRedux,
  markUnreadDb,
  markUnreadRedux,
  selectMarkAsImportantRedux,
} from "../../redux/actions/NotificationAction";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./NotificationObjectTable.module.css";

interface NotificationButtonProps {
  header: string;
  notificationSelected: string[];
  onClose?: () => void;
}

const NotificationTypeButton = ({
  header,
  notificationSelected,
  onClose,
}: NotificationButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      id="changeNotificationType"
      onClick={() => {
        if (header == "Mark as important") {
          dispatch(selectMarkAsImportantRedux(notificationSelected));
        } else if (header == "Mark as read") {
          dispatch(markReadDb(notificationSelected.join(",")));
          dispatch(markReadRedux(notificationSelected));
        } else if (header == "Mark as unread") {
          dispatch(markUnreadDb(notificationSelected.join(",")));
          dispatch(markUnreadRedux(notificationSelected));
        } else {
          dispatch(deleteNotificationDb(notificationSelected.join(",")));
          dispatch(deleteNotificationRedux(notificationSelected));
          if (onClose) {
            onClose();
          }
        }
      }}
    >
      {header}
    </Button>
  );
};

interface Props {
  notficationSelected: string[];
  onClose?: () => void;
}

const NotificationStatusFilter = ({ notficationSelected, onClose }: Props) => {
  return (
    <Box
      sx={{
        pt: 0,
        pl: 2,
        pr: 2,
        pb: 0.3,
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 1.5, backgroundColor: "#ebf3fa", right: 0 }}
      >
        <div className={styles.notificationFilterContainer}>
          <div className={styles.notificationNumberSelected}>
            <h3>({notficationSelected.length} Selected)</h3>
          </div>
          <div className={styles.notificationNumberSelected}>
            <h3>Select label: </h3>
          </div>
          <NotificationTypeButton
            header={"Mark as read"}
            notificationSelected={notficationSelected}
          />
          <NotificationTypeButton
            header={"Mark as unread"}
            notificationSelected={notficationSelected}
          />
          <NotificationTypeButton
            header={"Mark as important"}
            notificationSelected={notficationSelected}
          />
          <NotificationTypeButton
            header={"Delete"}
            notificationSelected={notficationSelected}
            onClose={onClose}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default NotificationStatusFilter;
