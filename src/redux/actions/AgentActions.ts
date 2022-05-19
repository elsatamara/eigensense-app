import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AlertListInterface } from "../../interfaces/AlertInterface";
import { axiosServerRequest, Methods } from "../../utils/AxiosUtils";

export const storeRecentlyViewedItems = createAsyncThunk(
  "AgentReducer/StoreRecentlyViewedItems",
  async (patternId: string) => {
    // const agentId = sessionStorage.getItem("agentId");
    const agentId = "A123";
    const res = await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/storeLogout/${patternId}/${agentId}`
    );
    return res.data;
  }
);

export const getAgentList = createAsyncThunk(
  "AgentReducer/GetAgentList",
  async () => {
    const res = await axiosServerRequest<any>(
      Methods.GET,
      `api/v1/get_agent_list`
    );
    return res.data;
  }
);
