import { createReducer } from "@reduxjs/toolkit";
import {
  NotificationInterface,
  NotificationListInterface,
  NotificationType,
} from "../../interfaces/NotificationInterface";
import {
  filterByNotificationType,
  getNotificationList,
  markReadRedux,
  markUnreadRedux,
  selectMarkAsImportantRedux,
  selectMarkAsUnimportantRedux,
} from "../actions/NotificationAction";
import { useAppDispatch, useAppSelector } from "../hooks";

const initialState: NotificationListInterface = {
  notificationList: [],
  originalList: [],
};

export const notificationList = createReducer(initialState, (builder) => {
  builder.addCase(getNotificationList.pending, (state, action) => {});
  builder.addCase(getNotificationList.fulfilled, (state, action) => {
    state.notificationList = action.payload;
    state.originalList = action.payload;
  });
  builder.addCase(getNotificationList.rejected, (state, action) => {});
  builder.addCase(selectMarkAsImportantRedux, (state, action) => {
    state.notificationList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.isImportant = true;
      }
    });
    state.originalList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.isImportant = true;
      }
    });
  });
  builder.addCase(selectMarkAsUnimportantRedux, (state, action) => {
    state.notificationList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.isImportant = false;
        elem.type = NotificationType.Read;
      }
    });
    state.originalList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.isImportant = false;
        elem.type = NotificationType.Read;
      }
    });
  });
  builder.addCase(markReadRedux, (state, action) => {
    state.notificationList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.type = NotificationType.Read;
      }
    });
    state.originalList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.type = NotificationType.Read;
      }
    });
  });
  builder.addCase(markUnreadRedux, (state, action) => {
    state.notificationList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.type = NotificationType.Unread;
      }
    });
    state.originalList.forEach((elem) => {
      if (action.payload.includes(elem.alertId)) {
        elem.type = NotificationType.Unread;
      }
    });
  });
  builder.addCase(filterByNotificationType, (state, action) => {
    const typeFilterParameter = action.payload;
    if (typeFilterParameter === NotificationType.All) {
      state.notificationList = state.originalList;
    } else {
      state.notificationList = state.originalList.filter(
        (notif) => notif.type === typeFilterParameter
      );
    }
  });
});
