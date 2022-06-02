import { createReducer } from "@reduxjs/toolkit";
import { CustomFilterInterface } from "../../interfaces/CustomFilterInterface";
import {
  clearCustomFilterState,
  setCustomFilterAlertList,
  setInitialStateRedux,
} from "../actions/CustomFilterAction";

const initialState: CustomFilterInterface = {
  name: "",
  location: [],
  agent: [],
  queue: [],
  status: [],
  type: [],
  from: null,
  to: null,
};

export const customFilter = createReducer(initialState, (builder) => {
  builder.addCase(setCustomFilterAlertList, (state: any, action) => {
    let filterHeaders = action.payload.filterHeaders.toLowerCase();
    let filterItems = action.payload.filterItems;
    if (filterHeaders == "from" || filterHeaders == "to") {
      state[filterHeaders] = filterItems;
      console.log(state[filterHeaders]);
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
    state.from = null;
    state.to = null;
  });
  builder.addCase(setInitialStateRedux, (state, action) => {
    state.location = action.payload.location;
    state.agent = action.payload.agent;
    state.queue = action.payload.queue;
    state.status = action.payload.status;
    state.type = action.payload.type;
    state.from = action.payload.from;
    state.to = action.payload.to;
  });
});
