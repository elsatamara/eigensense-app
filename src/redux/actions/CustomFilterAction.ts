import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const setCustomFilterAlertList = createAction<{
  filterHeaders: string;
  filterItems: string[] | undefined | Date;
}>("SET_CUSTOM_FILTER_ALERT_LIST");

export const clearCustomFilterState = createAction("CLEAR_CUSTOM_FILTER_STATE");
