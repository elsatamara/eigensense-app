import { createReducer } from "@reduxjs/toolkit";
import { SimilarPatternListInterface } from "../../interfaces/SimilarPatternInterface";
import {
  filterSimilarPatternList,
  getSimilarPatternList,
} from "../actions/SimilarPatternAction";

const initialState: SimilarPatternListInterface = {
  similarPatternList: [],
};

export const similarPatternList = createReducer(initialState, (builder) => {
  builder.addCase(getSimilarPatternList.pending, (state, action) => {});
  builder.addCase(getSimilarPatternList.fulfilled, (state, action) => {
    state.similarPatternList = action.payload;
  });
  builder.addCase(getSimilarPatternList.rejected, (state, action) => {});
  builder.addCase(filterSimilarPatternList, (state, action) => {
    let filter_id: string = action.payload.filter_id.toLowerCase();
    state.similarPatternList = state.similarPatternList.filter((alert: any) =>
      action.payload.filters.includes(alert[filter_id])
    );
  });
});
