import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

// export const getChartDataAction = createAsyncThunk(
//   "ChartReducer/getChartDataAction",
//   async (regname: string) => {
//     const res = await axiosServerRequest<any>(
//       Methods.GET,
//       `api/v1/getchart/${regname}`
//     );
//     console.log(res.data);
//     return res.data;
//   }
// );

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
