import { createReducer } from "@reduxjs/toolkit";
import { PatternListInterface } from "../../interfaces/PatternInterface";

const initialState: PatternListInterface = {
  patternList: [],
};

export const patternList = createReducer(initialState, (builder) => {});
