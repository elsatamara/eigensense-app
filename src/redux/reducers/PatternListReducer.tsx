import { createReducer } from "@reduxjs/toolkit";
import { PatternListInterface } from "../../interfaces/PatternInterface";
import {
  filterPatternList,
  filterPatternListByDate,
  getPatternList,
} from "../actions/PatternAction";

const initialState: PatternListInterface = {
  patternList: [],
};

export const patternList = createReducer(initialState, (builder) => {
  builder.addCase(getPatternList.fulfilled, (state, action) => {
    state.patternList = action.payload;
  });
  builder.addCase(filterPatternListByDate, (state, action) => {
    console.log("reducer");
    let from = action.payload.from;
    let to = action.payload.to;
    if (from !== undefined && to !== undefined) {
      state.patternList = state.patternList.filter(
        (pattern) =>
          new Date(pattern.date).getTime() <= to! &&
          new Date(pattern.date).getTime() >= from!
      );
    }
  });
  builder.addCase(filterPatternList, (state, action) => {
    let filter_id: string = action.payload.filter_id.toLowerCase();
    state.patternList = state.patternList.filter((alert: any) =>
      action.payload.filters.includes(alert[filter_id])
    );
  });
});
