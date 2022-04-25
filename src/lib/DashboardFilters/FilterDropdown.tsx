import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import {
  filterAlertList,
  resetAlertList,
} from "../../redux/actions/AlertListAction";
import {
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import NewFilterModal from "./NewFilterModal";

interface FilterProps {
  filters: Set<string> | Array<string>;
  header: string;
}

const FilterDropdown = ({ filters, header }: FilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);
  const [filterToRender, setFilterToRender] = React.useState<string[]>([
    ...filters,
  ]);
  const [textfieldValue, setTextfieldValue] = React.useState<string>("");
  let checkedFilter: string[] = [];
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<KeyboardArrowUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<KeyboardArrowDownIcon />);
  };
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextfieldValue(event.target.value);
    console.log("here");
    let original: string[] = [...filters];
    let pattern = /event.target.value/g;
    let matched: string[] = [];
    original.forEach((elem) => {
      console.log(elem.match(pattern));
    });
    console.log(matched);
    // let fruits: string[] = ["apple", "orange"];
    event.target.value == ""
      ? setFilterToRender(original)
      : setFilterToRender(matched);
  };
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
            onChange={(e) => handleTextFieldChange(e)}
          />
        </MenuItem>
        {filterToRender.map((elem) => {
          return (
            <MenuItem
              sx={{ width: "176px", zIndex: 0 }}
              onClick={() => {
                checkedFilter.push(elem);
              }}
            >
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText>{elem}</ListItemText>
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
            onClick={() => {
              handleDropdownClose();
              dispatch(
                filterAlertList({ filter_id: header, filters: checkedFilter })
              );
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
