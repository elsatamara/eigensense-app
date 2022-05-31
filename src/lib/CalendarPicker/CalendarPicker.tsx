import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button, Menu, MenuItem } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useAppDispatch } from "../../redux/hooks";
import { filterAlertListByDate } from "../../redux/actions/AlertListAction";
import { setCustomFilterAlertList } from "../../redux/actions/CustomFilterAction";
import { filterPatternListByDate } from "../../redux/actions/PatternAction";

interface Props {
  isCustomFilter?: boolean;
  isPatternSearch?: boolean;
}

const CalendarPicker = ({ isCustomFilter, isPatternSearch }: Props) => {
  const currentDate = new Date();
  const dispatch = useAppDispatch();
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <div>
      <Button
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        startIcon={
          <CalendarTodayIcon
            fontSize="small"
            sx={{ color: "#778CA2", mb: 0.3 }}
          />
        }
        sx={{ color: "black", mt: 1 }}
      >
        Select Date
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={() => {
          setAnchorEl(null);
          setRange(undefined);
        }}
        sx={{ height: "450px", width: "400px" }}
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
          <DayPicker
            mode="range"
            defaultMonth={currentDate}
            selected={range}
            footer={footer}
            onSelect={setRange}
          />
        </MenuItem>
        <MenuItem>
          <Button
            id="applyCalendarFilter"
            sx={{ ml: 1 }}
            onClick={() => {
              if (isCustomFilter) {
                dispatch(
                  setCustomFilterAlertList({
                    filterHeaders: "from",
                    filterItems: range?.from?.getTime(),
                  })
                );
                dispatch(
                  setCustomFilterAlertList({
                    filterHeaders: "to",
                    filterItems: range?.to?.getTime(),
                  })
                );
                setAnchorEl(null);
              } else if (isPatternSearch) {
                dispatch(
                  filterPatternListByDate({
                    from: range?.from?.getTime(),
                    to: range?.to?.getTime(),
                  })
                );
              } else {
                dispatch(
                  filterAlertListByDate({
                    from: range?.from?.getTime(),
                    to: range?.to?.getTime(),
                  })
                );
              }
            }}
          >
            Apply
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CalendarPicker;
