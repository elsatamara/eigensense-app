import React from "react";
import { Drawer, List, ListItem, useTheme, Tab, Tabs } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import styles from "./Tabs.module.css";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";

const PageTabs = () => {
  // const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  // const handleChange = (
  //   event: React.SyntheticEvent,
  //   newDrawerStatus: boolean
  // ) => {
  //   setDrawerOpen(newDrawerStatus);
  // };

  const theme = useTheme();

  const useStyles = makeStyles(() =>
    createStyles({
      drawer: {
        width: 240,
        flexShrink: 0,
        whiteSpace: "nowrap",
      },
      drawerOpen: {
        width: 240,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 75,
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(1) + 1,
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <div>
      <div className={styles.tabsContainer}>
        <Tabs
          // onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value={false} label="Dashboard" />
          {/* <Tab value={!isDrawerOpen} label="Search Patterns" /> */}
        </Tabs>
      </div>
      {/* <div>
        <Drawer
          variant="permanent"
          anchor="left"
          open={isDrawerOpen}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isDrawerOpen,
              [classes.drawerClose]: !isDrawerOpen,
            }),
          }}
        >
          <List sx={{ pt: 10 }}>
            {isDrawerOpen ? (
              <>
                <ListItem>Search Patterns</ListItem>
              </>
            ) : (
              <>
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <SearchIcon />
                </ListItem>
                <ListItem sx={{ pt: 0 }}>Search</ListItem>
              </>
            )}
          </List>
        </Drawer>
      </div> */}
    </div>
  );
};

export default PageTabs;
