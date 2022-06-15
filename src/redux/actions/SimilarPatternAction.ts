import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const getSimilarPatternList = createAsyncThunk(
  "SimilarPatternReducer/GetSimilarPatternList",
  async () => {
    console.log("hereee");
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_similar_pattern_list`
    );
    return res.data;
  }
);
