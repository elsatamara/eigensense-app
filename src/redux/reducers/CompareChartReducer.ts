import { createReducer } from "@reduxjs/toolkit";
import { ChartDataListInterface } from "../../interfaces/ChartInterface";
import {
  clearCompareChartData,
  getCompareChartData,
} from "../actions/CompareChartAction";

const initialState: ChartDataListInterface = {
  list: [],
};

export const compareChart = createReducer(initialState, (builder) => {
  builder.addCase(getCompareChartData.pending, (state, action) => {});
  builder.addCase(getCompareChartData.fulfilled, (state, action) => {
    state.list = action.payload;
  });
  builder.addCase(getCompareChartData.rejected, (state, action) => {});
  builder.addCase(clearCompareChartData, (state, action) => {
    state.list = [];
  });
});
