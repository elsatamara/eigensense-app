import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomFilterInterface } from "../../interfaces/CustomFilterInterface";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const setCustomFilterAlertList = createAction<{
  filterHeaders: string;
  filterItems: string[] | undefined | number;
}>("SET_CUSTOM_FILTER_ALERT_LIST");

export const clearCustomFilterState = createAction("CLEAR_CUSTOM_FILTER_STATE");

export const getCustomFilterList = createAsyncThunk(
  "CustomFilterListReducer/GetCustomFilterList",
  async () => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_custom_filter_list`
    );
    return res.data;
  }
);

export const deleteCustomFilter = createAsyncThunk(
  "CustomFilterListReducer/DeleteCustomFilter",
  async (filterid: string) => {
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/delete_custom_filter/${filterid}`
    );
  }
);

export const deleteCustomFilterRedux = createAction<string>(
  "DELETE_CUSTOM_FILTER"
);

export const saveCustomFilterDb = createAsyncThunk(
  "CustomFilterReducer/SaveCustomFilter",
  async (params: any) => {
    let urlQuery = new URLSearchParams(params).toString();
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/post_new_filter/${urlQuery}`
    );
  }
);

export const saveCustomFilterRedux = createAction<CustomFilterInterface>(
  "SAVE_CUSTOM_FILTER_REDUX"
);

export const setInitialStateRedux = createAction<CustomFilterInterface>(
  "SET_INITIAL_STATE_REDUX"
);

export const editCustomFilterDb = createAsyncThunk(
  "CustomFilterReducer/EditCustomFilter",
  async (params: any) => {
    let urlQuery = new URLSearchParams(params).toString();
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/edit_filter/${urlQuery}`
    );
  }
);

export const editCustomFilterRedux = createAction<{
  customFilterId: string;
  newName: string;
}>("EDIT_CUSTOM_FILTER_REDUX");
