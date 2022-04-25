import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";

const CalendarPicker = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ width: "176px" }}>
        <DatePicker
          views={["day"]}
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
          renderInput={(params: any) => (
            <TextField {...params} helperText={null} size="small" />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default CalendarPicker;
