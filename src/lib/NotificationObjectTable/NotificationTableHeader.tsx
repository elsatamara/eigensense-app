import { Menu, MenuItem, Box, Paper, Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  NotificationPeriod,
  NotificationType,
} from "../../interfaces/NotificationInterface";
import styles from "./NotificationObjectTable.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filterByNotificationType } from "../../redux/actions/NotificationAction";

interface NotificationPeriodTypeFilterProps {
  isPeriodFilter?: boolean;
}

const NotificationPeriodTypeFilter = ({
  isPeriodFilter,
}: NotificationPeriodTypeFilterProps) => {
  const notificationPeriodArray: NotificationPeriod[] = [
    NotificationPeriod.Anytime,
    NotificationPeriod.OneDay,
    NotificationPeriod.ThreeDays,
    NotificationPeriod.SevenDays,
    NotificationPeriod.OneMonth,
  ];

  const dispatch = useAppDispatch();

  const notificationTypeArray: NotificationType[] = [
    NotificationType.All,
    NotificationType.Read,
    NotificationType.Unread,
  ];

  const arrayToRender = isPeriodFilter
    ? notificationPeriodArray
    : notificationTypeArray;

  const fillState = isPeriodFilter
    ? NotificationPeriod.Anytime
    : NotificationType.All;

  const [currentState, setCurrentState] = React.useState<
    NotificationPeriod | NotificationType
  >(fillState);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const open = Boolean(anchorEl);

  const handleDropdownClick = (e: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(e.currentTarget);
    setEndArrow(<KeyboardArrowUpIcon />);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  return (
    <>
      <Button
        onClick={(e) => handleDropdownClick(e)}
        endIcon={endArrow}
        sx={{ width: "125px" }}
      >
        {currentState}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleDropdownClose}>
        {arrayToRender.map((item: any) => {
          return (
            <MenuItem
              onClick={() => {
                setCurrentState(item);
                console.log(item);
                if (Object.values(NotificationType).includes(item)) {
                  dispatch(filterByNotificationType(item));
                }
                handleDropdownClose();
              }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

const NotificationTableHeader = () => {
  return (
    <Box p={2} pb={0.25} sx={{ minWidth: "1000px" }}>
      <Paper elevation={0} sx={{ minWidth: "1000px", height: "70px" }}>
        <div className={styles.notficationTableHeaderContainer}>
          <div className={styles.notificationTableHeaderText}>
            NOTIFICATIONS
          </div>
          <div>
            <NotificationPeriodTypeFilter isPeriodFilter />
            <NotificationPeriodTypeFilter />
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default NotificationTableHeader;
