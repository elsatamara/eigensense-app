import { createReducer } from "@reduxjs/toolkit";
import { SimilarPatternListInterface } from "../../interfaces/SimilarPatternInterface";
import { getSimilarPatternList } from "../actions/SimilarPatternAction";

const initialState: SimilarPatternListInterface = {
  similarPatternList: [],
};

export const similarPatternList = createReducer(initialState, (builder) => {
  builder.addCase(getSimilarPatternList.pending, (state, action) => {});
  builder.addCase(getSimilarPatternList.fulfilled, (state, action) => {
    state.similarPatternList = action.payload;
  });
  builder.addCase(getSimilarPatternList.rejected, (state, action) => {});
});
