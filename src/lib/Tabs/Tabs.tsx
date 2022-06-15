import React from "react";
import { Button } from "@mui/material";
import styles from "./Tabs.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setSearchDrawerStateOpen,
  setSearchDrawerStateClosed,
} from "../../redux/actions/AlertListAction";

const PageTabs = () => {
  const isDrawerOpen = useAppSelector((state) => state.alertList.isDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.tabsContainer}>
        <Button
          onClick={() => {
            dispatch(setSearchDrawerStateClosed());
          }}
          sx={{ color: "#414141" }}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => {
            dispatch(setSearchDrawerStateOpen());
          }}
          sx={{ color: "#414141" }}
        >
          Search Patterns
        </Button>
      </div>
    </div>
  );
};

export default PageTabs;
