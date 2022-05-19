import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import React from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { storeRecentlyViewedItems } from "../../redux/actions/AgentActions";
import { useAppDispatch } from "../../redux/hooks";
import Logo from "./logo.png";
import styles from "./HeaderBar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<ArrowDropDownIcon />);
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<ArrowDropDownIcon />);
  };
  const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<ArrowDropUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        sx={{ color: "white", textTransform: "none" }}
        endIcon={endArrow}
        startIcon={<CircleIcon />}
        onClick={handleDropdownOpen}
      >
        John Doe
      </Button>
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDropdownClose}
      >
        <MenuItem
          onClick={() => {
            navigate(`/admin`);
          }}
        >
          Your Profile
        </MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

const NotificationList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  return (
    <>
      <NotificationsNoneIcon
        sx={{ mr: 2 }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      />
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem sx={{ width: "400px" }}>
          <div className={styles.notificationList}>
            <div className={styles.notificationHeader}>
              October 13, 2021 05:23AM EST
            </div>
            <div className={styles.notificationText}>
              Apple oranges boba matcha latte. This notification is to notify
              the hungriness that persists most of the time.
            </div>
            <div className={styles.notificationLocationId}>
              <div className={styles.notificationLocationIdText}>
                San Francisco, CA
              </div>
              <div className={styles.notificationLocationIdText}>10012554</div>
            </div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              navigate(`/notification`);
            }}
          >
            All Alert Notifications
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function logout() {
    if (localStorage.getItem("recentlyViewed")) {
      let recentlyViewedItems: AlertInterface[] = JSON.parse(
        localStorage.getItem("recentlyViewed")!
      );
      const patternId = recentlyViewedItems
        .map((item) => item.patternId)
        .join("");
      dispatch(storeRecentlyViewedItems(patternId));
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        bottom: "auto",
        bgcolor: "#202c34",
        height: "70px",
        minWidth: "800px",
      }}
      elevation={0}
    >
      <Toolbar>
        <div className={styles.parentHeaderContainer}>
          <Box
            component="img"
            sx={{
              height: 33,
              width: 150,
              ml: 6,
              mt: 0.5,
            }}
            alt="Your logo."
            src={Logo}
            onClick={() => {
              navigate(`/dashboard`);
            }}
          />
          <div className={styles.rightItemsContainer}>
            <EventNoteIcon sx={{ mr: 2 }} />
            <NotificationList />
            <UserProfileMenu />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
