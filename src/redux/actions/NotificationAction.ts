import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationInterface } from "../../interfaces/NotificationInterface";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getNotificationList = createAsyncThunk(
  "NotificationReducer/GetNotification",
  async () => {
    const res = await axiosServerRequest<NotificationInterface[]>(
      Methods.GET,
      `api/v1/get_notification_list`
    );
    return res.data;
  }
);

export const selectMarkAsImportantDb = createAsyncThunk(
  "NotificationReducer/SelectMarkAsImportant",
  async (alertId: string) => {
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/mark_important/${alertId}`
    );
  }
);

export const deselectMarkAsImportantDb = createAsyncThunk(
  "NotificationReducer/SelectMarkAsImportant",
  async (alertId: string) => {
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/mark_unimportant/${alertId}`
    );
  }
);

export const selectMarkAsImportantRedux = createAction<string[]>(
  "SELECT_MARK_AS_IMPORTANT"
);

export const selectMarkAsUnimportantRedux = createAction<string[]>(
  "SELECT_MARK_AS_UNIMPORTANT"
);

export const markReadDb = createAsyncThunk(
  "NotificationReducer/MarkReadDb",
  async (alertId: string) => {
    await axiosServerRequest<any>(Methods.POST, `api/v1/mark_read/${alertId}`);
  }
);

export const markUnreadDb = createAsyncThunk(
  "NotificationReducer/MarkUnreadDb",
  async (alertId: string) => {
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/mark_unread/${alertId}`
    );
  }
);

export const markReadRedux = createAction<string[]>("MARK_AS_READ");
export const markUnreadRedux = createAction<string[]>("MARK_AS_UNREAD");

export const filterByNotificationType = createAction<string>(
  "FILTER_BY_NOTIFICATION_TYPE"
);

export const filterByNotificationPeriod = createAction<string>(
  "FILTER_BY_NOTIFICATION_PERIOD"
);
