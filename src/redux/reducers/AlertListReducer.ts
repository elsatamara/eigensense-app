import { createReducer } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import { getAlertsList } from "../actions/AlertListAction";

const initialState: AlertListInterface = {
  alerts: [],
};

export const alertList = createReducer(initialState, (builder) => {
  builder.addCase(getAlertsList.pending, (state, action) => {});
  builder.addCase(getAlertsList.fulfilled, (state, action) => {
    console.log(action.payload);
    initialState.alerts = action.payload;
  });
  builder.addCase(getAlertsList.rejected, (state, action) => {});
});
