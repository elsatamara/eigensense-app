import { createReducer } from "@reduxjs/toolkit";
import {
  NotificationInterface,
  NotificationListInterface,
  NotificationPeriod,
  NotificationType,
} from "../../interfaces/NotificationInterface";
import {
  filterByNotificationPeriod,
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

  builder.addCase(filterByNotificationPeriod, (state, action) => {
    const periodFilterParameter = action.payload;
    const todayDate = new Date().getTime();
    if (periodFilterParameter == NotificationPeriod.Anytime) {
      state.notificationList = state.originalList;
    } else if (periodFilterParameter == NotificationPeriod.OneDay) {
      let from = todayDate - 1000 * 60 * 60 * 24;
      state.notificationList = state.originalList.filter(
        (notif) => new Date(notif.date).getTime() >= from
      );
    } else if (periodFilterParameter == NotificationPeriod.ThreeDays) {
      let from = todayDate - 1000 * 60 * 60 * 24 * 3;
      state.notificationList = state.originalList.filter(
        (notif) => new Date(notif.date).getTime() >= from
      );
    } else if (periodFilterParameter == NotificationPeriod.SevenDays) {
      let from = todayDate - 1000 * 60 * 60 * 24 * 7;
      state.notificationList = state.originalList.filter(
        (notif) => new Date(notif.date).getTime() >= from
      );
    } else {
      let from = todayDate - 1000 * 60 * 60 * 24 * 30;
      state.notificationList = state.originalList.filter(
        (notif) => new Date(notif.date).getTime() >= from
      );
    }
  });
});
