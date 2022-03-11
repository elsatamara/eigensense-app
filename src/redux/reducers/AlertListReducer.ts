import { createReducer } from "@reduxjs/toolkit";
import {
  AlertInterface,
  AlertListInterface,
} from "../../interfaces/AlertInterface";
import { AlertStatus } from "../../utils/AlertStatus";
import { getAlertsList } from "../actions/AlertListAction";

const initialState: AlertListInterface = {
  alerts: [],
};

export const alertList = createReducer(initialState, (builder) => {
  builder.addCase(getAlertsList.pending, (state, action) => {});
  builder.addCase(getAlertsList.fulfilled, (state, action) => {
    state.alerts = action.payload;
  });
  builder.addCase(getAlertsList.rejected, (state, action) => {});
});
