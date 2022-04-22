import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ViewsDatePicker from "../CalendarPicker/CalendarPicker";
import styles from "./DashboardTableHeader.module.css";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AddIcon from "@mui/icons-material/Add";

interface FilterProps {
  filters: Set<string> | Array<string>;
  header: string;
}

const AlertStatusDropdown = () => {
  return (
    <form>
      <select>
        <option>Alert Status</option>
      </select>
    </form>
  );
};

const SavedFilterDropdown = () => {
  return (
    <form>
      <select>
        <option>Saved Filter</option>
        <option>
          <Button>
            <AddIcon />
            Create new
          </Button>
        </option>
      </select>
    </form>
  );
};

const CreateNewButton = () => {
  return (
    <Button>
      <AddIcon />
      Create new
    </Button>
  );
};

const FilterDropdown = ({ filters, header }: FilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  const open = Boolean(anchorEl);
  let placeholder: string = "Type " + header + "...";
  return (
    <>
      <Button
        variant="contained"
        endIcon={endArrow}
        onClick={(e) => {
          handleDropdownClick(e);
        }}
        disableElevation
        sx={{
          width: "176px",
          height: "34px",
          backgroundColor: "#F5F6F7",
          color: "black",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        {header}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={handleDropdownClose}
      >
        <MenuItem
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <TextField placeholder={placeholder} size="small" />
        </MenuItem>
        {[...filters].map((elem) => {
          return (
            <MenuItem sx={{ width: "176px" }}>
              <ListItemIcon>
                <CheckBoxOutlineBlankOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{elem}</ListItemText>
            </MenuItem>
          );
        })}
        {header === "Saved Filter" ? <CreateNewButton /> : <></>}
        <MenuItem>
          <Button id="applyFilter" onClick={handleDropdownClose}>
            Apply
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};
const MoreFilterPicker = () => {
  const alertListState = useAppSelector((state) => state.alertList.alerts);
  const locations: Set<string> = new Set();
  const regulators: Set<string> = new Set();
  const agents: Set<string> = new Set();
  const alertQueues: Set<string> = new Set();
  const alertStatus: Set<string> = new Set();
  //TODO: FETCH SAVED FILTER
  const savedFilter = ["Apple", "Oranges", "Boba"];
  alertListState.forEach((elem) => {
    locations.add(elem.location);
    regulators.add(elem.regulator);
    agents.add(elem.agentName);
    alertQueues.add(elem.alertQueue);
  });
  return (
    <Box p={2} pt={0} pb={0.25}>
      <Paper
        sx={{ height: "90px", alignContent: "center", display: "flex" }}
        elevation={0.5}
      >
        <div className={styles.dropdownsContainer}>
          <FilterDropdown filters={locations} header={"Location"} />
          <FilterDropdown filters={regulators} header={"Regulator"} />
          <FilterDropdown filters={agents} header={"Agent"} />
          <FilterDropdown filters={alertQueues} header={"Alert Queue"} />
          <AlertStatusDropdown />
          <FilterDropdown filters={savedFilter} header={"Saved Filter"} />

          <Button>
            <CachedOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
            Reset All Filters
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

const DashboardTableHeader = () => {
  const [moreFilters, setMoreFilters] = React.useState(false);
  return (
    <div>
      <Box p={2} pb={0.25}>
        <Paper elevation={0}>
          <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
              <Tabs>
                <Tab label="ALERT MANAGEMENT" />
                <Tab label="FLAGGED PATTERNS" />
              </Tabs>
            </div>
            <div className={styles.rightHeader}>
              <ViewsDatePicker />
              <Button
                id="moreFilter"
                onClick={() => {
                  setMoreFilters(!moreFilters);
                }}
                sx={{ ml: 3 }}
              >
                More filters
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
      {moreFilters ? <MoreFilterPicker /> : <></>}
    </div>
  );
};

export default DashboardTableHeader;
