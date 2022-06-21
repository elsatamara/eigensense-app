import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getCompareChartData = createAsyncThunk(
  "CompareChartReducer/getCompareChartData",
  async (patternName: string) => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_compare_chart/${patternName}`
    );
    console.log(res.data);
    console.log("here");
    return res.data;
  }
);

export const clearCompareChartData = createAction("CLEAR_COMPARE_CHART_DATA");
