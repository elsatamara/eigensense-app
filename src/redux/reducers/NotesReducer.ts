import { createReducer } from "@reduxjs/toolkit";
import { NotesListInterface } from "../../interfaces/NotesInterface";
import { getNotes } from "../actions/NotesAction";

const initialState: NotesListInterface = {
  notes: [],
};

export const notesList = createReducer(initialState, (builder) => {
  builder.addCase(getNotes.pending, (state, action) => {});
  builder.addCase(getNotes.fulfilled, (state, action) => {
    state.notes = action.payload;
  });
  builder.addCase(getNotes.rejected, (state, action) => {});
});
