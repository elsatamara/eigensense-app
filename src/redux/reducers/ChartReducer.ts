import { createReducer } from "@reduxjs/toolkit";
import { ChartDataListInterface } from "../../interfaces/ChartInterface";
import {
  getAnotherChartDataAction,
  getChartDataAction,
} from "../actions/ChartActions";

const initialState: ChartDataListInterface = {
  list: [],
};

export const chart = createReducer(initialState, (builder) => {
  builder.addCase(getChartDataAction.pending, (state, action) => {});
  builder.addCase(getChartDataAction.fulfilled, (state, action) => {
    state.list = action.payload;
  });
  builder.addCase(getAnotherChartDataAction.pending, (state, action) => {});
  builder.addCase(getAnotherChartDataAction.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});
