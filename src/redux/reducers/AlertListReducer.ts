import { createReducer } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import {
  getAlertsList,
  setSearchDrawerState,
  filterAlertList,
  resetAlertList,
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
  builder.addCase(filterAlertList, (state, action) => {
    let filter_id: string = action.payload.filter_id.toLowerCase();
    console.log(action.payload.filters);
    state.alerts = state.alerts.filter((alert: any) =>
      action.payload.filters.includes(alert[filter_id])
    );
    console.log(state.alerts);
  });
  builder.addCase(resetAlertList, (state, action) => {
    state.alerts = action.payload;
  });
});
