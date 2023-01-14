import { createReducer } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import {
  getAlertsList,
  setSearchDrawerStateOpen,
  filterAlertList,
  changeAlertStatus,
  filterAlertListByDate,
  setSearchDrawerStateClosed,
} from "../actions/AlertListAction";
import { submitCustomFilterAlertList } from "../actions/AlertListAction";
import { useAppSelector } from "../hooks";

const initialState: AlertListInterface = {
  alerts: [],
  isDrawerOpen: false,
};

export const alertList = createReducer(initialState, (builder) => {
  builder.addCase(getAlertsList.pending, (state, action) => {});
  builder.addCase(getAlertsList.fulfilled, (state, action) => {
    state.alerts = action.payload;
    localStorage.setItem("regulatorMap", JSON.stringify(action.payload[1]));
  });
  builder.addCase(getAlertsList.rejected, (state, action) => {});
  builder.addCase(setSearchDrawerStateOpen, (state) => {
    state.isDrawerOpen = true;
  });
  builder.addCase(setSearchDrawerStateClosed, (state) => {
    state.isDrawerOpen = false;
  });
  builder.addCase(filterAlertList, (state, action) => {
    let filter_id: string = action.payload.filter_id.toLowerCase();
    state.alerts = state.alerts.filter((alert: any) =>
      action.payload.filters.includes(alert[filter_id])
    );
  });
  builder.addCase(changeAlertStatus, (state, action) => {
    let changeAction = action.payload.changeAction;
    let alertToChange = action.payload.alertToChange;
    state.alerts.forEach((elem) => {
      if (alertToChange.includes(elem.patternId)) {
        elem.status = changeAction;
      }
    });
  });
  builder.addCase(filterAlertListByDate, (state, action) => {
    let from = action.payload.from;
    let to = action.payload.to;
    if (from !== undefined && to !== undefined) {
      state.alerts = state.alerts.filter(
        (alert) =>
          new Date(alert.date).getTime() <= to! &&
          new Date(alert.date).getTime() >= from!
      );
    }
  });
  builder.addCase(submitCustomFilterAlertList, (state, action) => {
    const customFilterState = action.payload;
    console.log("customFilterPayload", customFilterState);

    if (customFilterState.location[0] !== "") {
      state.alerts = state.alerts.filter((alert) =>
        customFilterState.location.includes(alert.location)
      );
      console.log(state.alerts);
    }
    if (customFilterState.agent[0] !== "") {
      state.alerts = state.alerts.filter((alert) =>
        customFilterState.agent.includes(alert.agentName)
      );
    }
    if (customFilterState.queue[0] !== "") {
      state.alerts = state.alerts.filter((alert) =>
        customFilterState.queue.includes(alert.alertQueue)
      );
    }
    if (customFilterState.type[0] !== "") {
      state.alerts = state.alerts.filter((alert) =>
        customFilterState.type.includes(alert.alertType)
      );
    }

    if (customFilterState.status[0] !== "") {
      state.alerts = state.alerts.filter((alert) =>
        customFilterState.status.includes(alert.status)
      );
    }

    let from = customFilterState.from;
    let to = customFilterState.to;
    if (from !== null && to !== null) {
      state.alerts = state.alerts.filter(
        (alert) =>
          new Date(alert.date).getTime() <= to! &&
          new Date(alert.date).getTime() >= from!
      );
    }
  });
});
