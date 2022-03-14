import React from "react";
import { Drawer, List, ListItem, useTheme, Tab, Tabs } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import styles from "./Tabs.module.css";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchDrawerState } from "../../redux/actions/AlertListAction";

const PageTabs = () => {
  const isDrawerOpen = useAppSelector((state) => state.alertList.isDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.tabsContainer}>
        <Tabs
          onChange={() => {
            dispatch(setSearchDrawerState());
          }}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value={false} label="Dashboard" />
          <Tab value={!isDrawerOpen} label="Search Patterns" />
        </Tabs>
      </div>
    </div>
  );
};

export default PageTabs;
