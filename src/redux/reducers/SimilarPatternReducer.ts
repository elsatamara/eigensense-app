import { createReducer } from "@reduxjs/toolkit";
import {
  SimilarPatternAlgoListInterface,
  SimilarPatternListInterface,
} from "../../interfaces/SimilarPatternInterface";
import {
  filterSimilarPatternList,
  getSimilarPatternDemo,
  getSimilarPatternList,
} from "../actions/SimilarPatternAction";

const initialState: SimilarPatternAlgoListInterface = {
  similarPatternAlgoList: [],
};

export const similarPatternList = createReducer(initialState, (builder) => {
  // builder.addCase(getSimilarPatternList.pending, (state, action) => {});
  // builder.addCase(getSimilarPatternList.fulfilled, (state, action) => {
  //   state.similarPatternList = action.payload;
  // });
  // builder.addCase(getSimilarPatternList.rejected, (state, action) => {});
  // builder.addCase(filterSimilarPatternList, (state, action) => {
  //   let filter_id: string = action.payload.filter_id.toLowerCase();
  //   state.similarPatternList = state.similarPatternList.filter((alert: any) =>
  //     action.payload.filters.includes(alert[filter_id])
  //   );
  // });
  builder.addCase(getSimilarPatternDemo.fulfilled, (state, action) => {
    state.similarPatternAlgoList = action.payload;
    state.similarPatternAlgoList.forEach((elem) => {
      elem.agent = "A123";
      elem.location = "LocationDemo";
      elem.patternId = "EigenPatternIDDemo";
      elem.patternName = "EigenPatternNameDemo";
      elem.regulator = "RegulatorDemo";
    });
    console.log(state.similarPatternAlgoList);
  });
});
