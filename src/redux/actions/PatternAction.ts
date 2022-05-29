import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PatternInterface } from "../../interfaces/PatternInterface";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getPatternList = createAsyncThunk(
  "PatternReducer/GetPatternList",
  async () => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_pattern_list`
    );
    return res.data;
  }
);

export const filterPatternListByDate = createAction<{
  from: Date | undefined;
  to: Date | undefined;
}>("FILTER_PATTERN_LIST_BY_DATE");

export const filterPatternList = createAction<{
  filter_id: string;
  filters: Array<string>;
}>("FILTER_ALERT_LIST");
