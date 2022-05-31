import React from "react";
import {
  Drawer,
  List,
  ListItem,
  useTheme,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import styles from "./Tabs.module.css";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";
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
