import {
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./AllFilters.module.css";

const AlertTypeFilter = () => {
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  const alertTypes: Set<string> = new Set();
  alertListState.forEach((elem) => alertTypes.add(elem.alertType));

  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };

  return (
    <div className={styles.alertTypeFilterContainer}>
      <div className={styles.alertTypeFilterHeader}>ALERT TYPE</div>
      <Button
        endIcon={endArrow}
        onClick={(e) => {
          handleDropdownClick(e);
        }}
        sx={{ color: "black", fontFamily: "Rubik" }}
      >
        All
      </Button>
      <Menu
        id="alert-type-filter"
        onClose={handleDropdownClose}
        open={open}
        anchorEl={anchorEl}
      >
        {[...alertTypes].map((elem) => {
          return (
            <MenuItem sx={{ width: "176px" }}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText>{elem}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default AlertTypeFilter;
