import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Menu, MenuItem } from "@mui/material";

const ChangeAlertStatusDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const [changeStatusAction, setChangeStatusAction] = React.useState("");

  const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  const open = Boolean(anchorEl);

  const headers = ["Review", "Reassign", "Pending", "Suppress", "Close"];

  return (
    <>
      <Button
        variant="contained"
        endIcon={endArrow}
        onClick={(e) => {
          handleDropdownOpen(e);
        }}
        disableElevation
        sx={{
          width: "176px",
          height: "34px",
          backgroundColor: "#F5F6F7",
          color: "black",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "#F5F6F7",
          },
        }}
      >
        Reassign
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={handleDropdownClose}
        sx={{ height: "314px", width: "250px" }}
      >
        {headers.map((elem) => {
          return (
            <MenuItem
              sx={{ width: "176px" }}
              onClick={() => {
                setChangeStatusAction(elem);
              }}
            >
              {elem}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ChangeAlertStatusDropdown;
