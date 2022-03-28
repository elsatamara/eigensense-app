import { createReducer } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import {
  getAlertsList,
  setSearchDrawerState,
} from "../actions/AlertListAction";

const initialState: AlertListInterface = {
  alerts: [],
  isDrawerOpen: false,
};

export const alertList = createReducer(initialState, (builder) => {
  builder.addCase(getAlertsList.pending, (state, action) => {});
  builder.addCase(getAlertsList.fulfilled, (state, action) => {
    state.alerts = action.payload;
  });
  builder.addCase(getAlertsList.rejected, (state, action) => {});
  builder.addCase(setSearchDrawerState, (state) => {
    state.isDrawerOpen = !state.isDrawerOpen;
  });
});
