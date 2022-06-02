import { createReducer } from "@reduxjs/toolkit";
import { CustomFilterListInterface } from "../../interfaces/CustomFilterInterface";
import {
  deleteCustomFilterRedux,
  editCustomFilterRedux,
  getCustomFilterList,
  saveCustomFilterRedux,
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
  builder.addCase(editCustomFilterRedux, (state, action) => {
    let filterId = action.payload.customFilterId;
    let newName = action.payload.newName;
    state.customFilterList.forEach((filter) => {
      if (filter.customFilterId == filterId) {
        filter.name = newName;
      }
    });
  });
  builder.addCase(saveCustomFilterRedux, (state, action) => {
    state.customFilterList.push(action.payload);
  });
});
