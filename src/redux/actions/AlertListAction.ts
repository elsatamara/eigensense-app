import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
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

export const setSearchDrawerState = createAction("SET_SEARCH_DRAWER_STATE");
