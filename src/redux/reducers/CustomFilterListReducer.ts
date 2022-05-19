import { createReducer } from "@reduxjs/toolkit";
import { CustomFilterListInterface } from "../../interfaces/CustomFilterInterface";
import {
  deleteCustomFilterRedux,
  getCustomFilterList,
} from "../actions/CustomFilterAction";

const initialState: CustomFilterListInterface = {
  customFilterList: [],
};

export const customFilterList = createReducer(initialState, (builder) => {
  builder.addCase(getCustomFilterList.fulfilled, (state, action) => {
    state.customFilterList = action.payload;
  });
  builder.addCase(deleteCustomFilterRedux, (state, action) => {
    state.customFilterList = state.customFilterList.filter(
      (filter) => filter.name != action.payload
    );
  });
});
