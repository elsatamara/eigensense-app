import { createReducer } from "@reduxjs/toolkit";
import { CustomFilterInterface } from "../../interfaces/CustomFilterInterface";
import {
  clearCustomFilterState,
  setCustomFilterAlertList,
} from "../actions/CustomFilterAction";

const initialState: CustomFilterInterface = {
  name: "",
  location: [],
  agent: [],
  queue: [],
  status: [],
  type: [],
  from: undefined,
  to: undefined,
};

export const customFilter = createReducer(initialState, (builder) => {
  builder.addCase(setCustomFilterAlertList, (state: any, action) => {
    let filterHeaders = action.payload.filterHeaders.toLowerCase();
    let filterItems = action.payload.filterItems;
    if (filterHeaders == "from" || filterHeaders == "to") {
      state[filterHeaders] = filterItems;
    } else {
      state[filterHeaders] = state[filterHeaders].concat(filterItems);
    }
  });
  builder.addCase(clearCustomFilterState, (state, action) => {
    state.location = [];
    state.agent = [];
    state.queue = [];
    state.status = [];
    state.type = [];
  });
});
