import { createReducer } from "@reduxjs/toolkit";
import { ChartCSVListInterface } from "../../interfaces/ChartCSV.interface";
import { getChartCSV } from "../actions/ChartActions";

const initialState: ChartCSVListInterface = {
  chartCSVList: [],
};

export const chartCSVList = createReducer(initialState, (builder) => {
  builder.addCase(getChartCSV.fulfilled, (state, action) => {
    state.chartCSVList = action.payload;
    console.log(state.chartCSVList);
  });
});
