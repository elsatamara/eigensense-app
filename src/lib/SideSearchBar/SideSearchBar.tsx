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
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./SideSearchBar.module.css";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import FilterDropdown from "../DashboardFilters/FilterDropdown";
import { setSearchDrawerState } from "../../redux/actions/AlertListAction";
import { getPatternList } from "../../redux/actions/PatternAction";

const SideSearchBar = () => {
  const theme = useTheme();
  const isDrawerOpen = useAppSelector((state) => state.alertList.isDrawerOpen);
  const dispatch = useAppDispatch();
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
              <ListItem
                onClick={() => {
                  dispatch(setSearchDrawerState());
                }}
              >
                <h3>SEARCH PATTERNS</h3>
              </ListItem>
              <ListItem>
                <CalendarPicker isPatternSearch />
              </ListItem>
              <ListItem>
                <FilterDropdown header={"Location"} isPatternSearchFilter />
              </ListItem>
              <ListItem>
                <FilterDropdown header={"Regulator"} isPatternSearchFilter />
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => {
                    dispatch(getPatternList());
                  }}
                >
                  Reset All
                </Button>
                {/* <Button>Submit</Button> */}
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  dispatch(setSearchDrawerState());
                }}
              >
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
