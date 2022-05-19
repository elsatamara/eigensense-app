import { createReducer } from "@reduxjs/toolkit";
import { AgentListInterface } from "../../interfaces/AgentInterface";
import { getAgentList } from "../actions/AgentActions";

const initialState: AgentListInterface = {
  agentList: [],
};

export const agentList = createReducer(initialState, (builder) => {
  builder.addCase(getAgentList.fulfilled, (state, action) => {
    state.agentList = action.payload;
  });
});
