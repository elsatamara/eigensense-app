import { createReducer } from "@reduxjs/toolkit";
import { ChartDataListInterface } from "../../interfaces/ChartInterface";
import { getChartDataAction } from "../actions/ChartActions";

const initialState: ChartDataListInterface = {
  chartData: [],
};

export const chart = createReducer(initialState, (builder) => {
  builder.addCase(getChartDataAction.pending, (state, action) => {});
  builder.addCase(getChartDataAction.fulfilled, (state, action) => {
    state.chartData = action.payload[0];
  });
});
