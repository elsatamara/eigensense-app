import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getChartDataAction = createAsyncThunk(
  "ChartReducer/getChartDataAction",
  async (regulator: string) => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/getchartdata/${regulator}`
    );
    console.log(res.data);
    return res.data;
  }
);

export const addNotesAction = createAsyncThunk(
  "ChartReducer/addNotes",
  async (notesData: string) => {
    console.log(notesData);
    const sessionID = window.sessionStorage.getItem("sessionID");
    const agentID = window.sessionStorage.getItem("agentID");
    const res = await axiosServerRequest(
      Methods.POST,
      `api/v1/post_notes/${sessionID}/${agentID}/${notesData}`
    );
    console.log(res);
    return res.data;
  }
);

export const getChartCSV = createAsyncThunk(
  "ChartReducer/GetChartCSV",
  async () => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_chart_csv`
    );
    console.log(res.data);
    return res.data;
  }
);
