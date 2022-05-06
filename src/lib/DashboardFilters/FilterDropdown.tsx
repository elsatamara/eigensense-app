import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import { filterAlertList } from "../../redux/actions/AlertListAction";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import NewFilterModal from "./NewFilterModal";
import { setCustomFilterAlertList } from "../../redux/actions/CustomFilterAction";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { PatternInterface } from "../../interfaces/PatternInterface";

interface FilterProps {
  header: string;
  isCustomFilter?: boolean;
  isPatternSearchFilter?: boolean;
}

const FilterDropdown = ({
  header,
  isCustomFilter,
  isPatternSearchFilter,
}: FilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);

  const alerts = useAppSelector((state) => state.alertList.alerts);
  const patterns = useAppSelector((state) => state.patternList.patternList);

  const alertList: AlertInterface[] | PatternInterface[] = isPatternSearchFilter
    ? patterns
    : alerts;

  var filterToRender =
    header == "Saved Filter"
      ? ["Apple", "Oranges"]
      : [
          ...new Set(
            alertList.map((alert: any) => alert[header.toLowerCase()])
          ),
        ];

  const [textfieldValue, setTextfieldValue] = React.useState<string>("");
  let checkedFilter = new Set<string>();
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  const handleMenuItemChange = () => {};

  const open = Boolean(anchorEl);
  let placeholder: string = "Type " + header + "...";
  const dispatch = useAppDispatch();

  const CreateNewButton = () => {
    const [isNewFilterModalOpen, setIsNewFilterModalOpen] =
      React.useState(false);
    return (
      <div>
        <Button
          id="createNewFilter"
          onClick={() => {
            setIsNewFilterModalOpen(true);
          }}
        >
          <AddIcon />
          Create new
        </Button>
        {isNewFilterModalOpen ? (
          <NewFilterModal onClose={handleDropdownClose} />
        ) : (
          <></>
        )}
      </div>
    );
  };
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
            bgcolor: "#F5F6F7",
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
        sx={{ height: "314px", width: "250px" }}
      >
        <MenuItem
          sx={{
            position: "sticky",
            top: 0,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "white",
            },
            backgroundColor: "white",
            zIndex: 2,
          }}
        >
          <TextField
            placeholder={placeholder}
            size="small"
            value={textfieldValue}
            // onChange={(e) => handleTextFieldChange(e)}
          />
        </MenuItem>
        {filterToRender.map((elem: any) => {
          return (
            <MenuItem sx={{ width: "176px", zIndex: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        checkedFilter.add(elem);
                      } else {
                        checkedFilter.delete(elem);
                      }
                    }}
                  />
                }
                label={elem}
                sx={{ width: "100%" }}
              />
            </MenuItem>
          );
        })}
        {header === "Saved Filter" ? <CreateNewButton /> : null}
        <MenuItem
          sx={{
            position: "sticky",
            backgroundColor: "white",
            bottom: 0,
            zIndex: 2,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "white",
            },
          }}
        >
          <Button
            id="applyFilter"
            onClick={(e) => {
              if (isCustomFilter) {
                dispatch(
                  setCustomFilterAlertList({
                    filterHeaders: header,
                    filterItems: [...checkedFilter],
                  })
                );
              } else {
                dispatch(
                  filterAlertList({
                    filter_id: header,
                    filters: [...checkedFilter],
                  })
                );
              }
              handleDropdownClose();
            }}
          >
            Apply
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterDropdown;
