import React from "react";
import { Drawer, List, ListItem, useTheme, Tab, Tabs } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SideSearchBar.module.css";

const SideSearchBar = () => {
  const theme = useTheme();
  const isDrawerOpen = useAppSelector((state) => state.alertList.isDrawerOpen);

  const useStyles = makeStyles(() =>
    createStyles({
      drawer: {
        width: 240,
        flexShrink: 0,
        whiteSpace: "nowrap",
      },
      drawerOpen: {
        width: 240,
        marginRight: 25,
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
        width: 80,
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(1) + 1,
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        open={isDrawerOpen}
        elevation={20}
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
              <ListItem>
                <h2>Search Patterns</h2>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <SearchIcon fontSize="medium" />
              </ListItem>
              <ListItem sx={{ pt: 0 }}>
                <h2>Search</h2>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default SideSearchBar;
