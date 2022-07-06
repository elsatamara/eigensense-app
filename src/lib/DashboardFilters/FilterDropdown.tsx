import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import {
  filterAlertList,
  submitCustomFilterAlertList,
} from "../../redux/actions/AlertListAction";
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
import { filterPatternList } from "../../redux/actions/PatternAction";
import {
  CustomFilterInterface,
  CustomFilterListInterface,
} from "../../interfaces/CustomFilterInterface";
import { SimilarPatternInterface } from "../../interfaces/SimilarPatternInterface";
import { filterSimilarPatternList } from "../../redux/actions/SimilarPatternAction";

interface FilterProps {
  header: string;
  isCustomFilter?: boolean;
  isPatternSearchFilter?: boolean;
  isSimilarPatternFilter?: boolean;
}

const FilterDropdown = ({
  header,
  isCustomFilter,
  isPatternSearchFilter,
  isSimilarPatternFilter,
}: FilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<KeyboardArrowDownIcon />);

  const alerts = useAppSelector((state) => state.alertList.alerts);
  const patterns = useAppSelector((state) => state.patternList.patternList);
  const savedFilters = useAppSelector(
    (state) => state.customFilterList.customFilterList
  );
  const similarPatterns = useAppSelector(
    (state) => state.similarPatternList.similarPatternAlgoList
  );

  let alertList:
    | AlertInterface[]
    | PatternInterface[]
    | SimilarPatternInterface[] = isPatternSearchFilter ? patterns : alerts;

  // if (isSimilarPatternFilter) {
  //   alertList = similarPatterns;
  // }

  let filterToRender: any;

  if (header === "Saved Filter") {
    filterToRender = savedFilters.map((filter: any) => [
      filter.name,
      filter.customFilterId,
    ]);
  } else if (header === "Queue") {
    filterToRender = [
      ...new Set(alertList.map((alert: any) => alert.alertQueue)),
    ];
  } else if (header === "Agent") {
    filterToRender = [
      ...new Set(alertList.map((alert: any) => alert.agentName)),
    ];
  } else {
    filterToRender = [
      ...new Set(alertList.map((alert: any) => alert[header.toLowerCase()])),
    ];
  }

  const [filterToRenderState, setFilterToRenderState] =
    React.useState(filterToRender);
  const [textfieldValue, setTextfieldValue] = React.useState<string>("");

  useEffect(() => {
    let itemRegex = new RegExp(textfieldValue, "i");
    if (textfieldValue.length > 0) {
      let newItems = [...filterToRenderState].filter((item) =>
        itemRegex.test(item)
      );
      setFilterToRenderState(newItems);
    } else if (textfieldValue.length === 0) {
      setFilterToRenderState([...filterToRender]);
    }
  }, [textfieldValue]);

  let checkedFilter = new Set<string>();
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
  const dispatch = useAppDispatch();

  const handleSubmitCustomFilter = () => {
    const filter: CustomFilterInterface = savedFilters.find(
      (elem) => elem.customFilterId === [...checkedFilter][0]
    )!;
    dispatch(submitCustomFilterAlertList(filter));
  };

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
        sx={{ height: "314px", width: "210px" }}
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
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        >
          <TextField
            placeholder={placeholder}
            size="small"
            value={textfieldValue}
            onChange={(e) => setTextfieldValue(e.target.value)}
          />
        </MenuItem>
        {filterToRenderState.map((elem: any) => {
          return (
            <MenuItem key={elem} sx={{ width: "210px", zIndex: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        {
                          header === "Saved Filter"
                            ? checkedFilter.add(elem[1])
                            : checkedFilter.add(elem);
                        }
                      } else {
                        {
                          header === "Saved Filter"
                            ? checkedFilter.delete(elem[1])
                            : checkedFilter.delete(elem);
                        }
                      }
                    }}
                  />
                }
                label={header === "Saved Filter" ? elem[0] : elem}
                sx={{ width: "210px" }}
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
              } else if (isPatternSearchFilter) {
                dispatch(
                  filterPatternList({
                    filter_id: header,
                    filters: [...checkedFilter],
                  })
                );
              } else if (isSimilarPatternFilter) {
                dispatch(
                  filterSimilarPatternList({
                    filter_id: header,
                    filters: [...checkedFilter],
                  })
                );
              } else {
                if (header === "Saved Filter") {
                  handleSubmitCustomFilter();
                } else {
                  dispatch(
                    filterAlertList({
                      filter_id: header,
                      filters: [...checkedFilter],
                    })
                  );
                }
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
