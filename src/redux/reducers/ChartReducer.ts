import { createReducer } from "@reduxjs/toolkit";
import { ChartDataListInterface } from "../../interfaces/ChartInterface";
import { getChartDataAction } from "../actions/ChartActions";

const initialState: ChartDataListInterface = {
  list: [],
};

export const chart = createReducer(initialState, (builder) => {
  builder.addCase(getChartDataAction.pending, (state, action) => {});
  builder.addCase(getChartDataAction.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});
