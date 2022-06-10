import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const login = createAsyncThunk(
  "AuthActions/Login",
  async (params: any) => {}
);
