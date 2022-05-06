import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import { AlertStatus } from "../../utils/AlertStatus";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getAlertsList = createAsyncThunk(
  "AlertListReducer/GetAlertList",
  async () => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_alerts_list`
    );
    return res.data;
  }
);

export const filterAlertList = createAction<{
  filter_id: string;
  filters: Array<string>;
}>("FILTER_ALERT_LIST");

export const setSearchDrawerState = createAction("SET_SEARCH_DRAWER_STATE");

export const changeAlertStatus = createAction<{
  changeAction: AlertStatus;
  alertToChange: string[];
}>("CHANGE_ALERT_STATUS");

export const changeAlertStatusDb = createAsyncThunk(
  "AlertListReducer/ChangeAlertStatusDb",
  async (params: any) => {
    const urlQuery = new URLSearchParams(params).toString();
    const res = await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/change_status/${urlQuery}`
    );
  }
);

export const filterAlertListByDate = createAction<{
  from: Date | undefined;
  to: Date | undefined;
}>("FILTER_ALERT_LIST_BY_DATE");

export const submitCustomFilterAlertList = createAction(
  "SUBMIT_CUSTOM_FILTER_ALERT_LIST"
);
