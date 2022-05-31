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
  async (name: string) => {
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/delete_custom_filter/${name}`
    );
  }
);

export const deleteCustomFilterRedux = createAction<string>(
  "DELETE_CUSTOM_FILTER"
);

export const saveCustomFilterDb = createAsyncThunk(
  "CustomFilterReducer/SaveCustomFilter",
  async (params: CustomFilterInterface) => {
    let name = params.name;
    let location = params.location.join(",");
    let agent = params.agent.join(",");
    let queue = params.queue.join(",");
    let status = params.status.join(",");
    let type = params.type.join(",");
    let from = params.from;
    let to = params.to;
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/post_new_filter/${name}/${location}/${agent}/${queue}/${status}/${type}/${from}/${to}`
    );
  }
);
