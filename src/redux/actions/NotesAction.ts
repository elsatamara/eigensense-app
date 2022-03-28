import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotesInterface } from "../../interfaces/NotesInterface";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getNotes = createAsyncThunk(
  "NotesReducer/GetNotes",
  async (alertId: string) => {
    const res = await axiosServerRequest<NotesInterface[]>(
      Methods.GET,
      `api/v1/getNotes/${alertId}`
    );
    return res.data;
  }
);
