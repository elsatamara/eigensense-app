import { createReducer } from "@reduxjs/toolkit";
import { NotesListInterface } from "../../interfaces/NotesInterface";
import {
  deleteNoteRedux,
  getNotes,
  postNotesRedux,
  updateNoteRedux,
} from "../actions/NotesAction";

const initialState: NotesListInterface = {
  notes: [],
};

export const notesList = createReducer(initialState, (builder) => {
  builder.addCase(getNotes.pending, (state, action) => {});
  builder.addCase(getNotes.fulfilled, (state, action) => {
    state.notes = action.payload;
  });
  builder.addCase(getNotes.rejected, (state, action) => {});
  builder.addCase(deleteNoteRedux, (state, action) => {
    console.log(action.payload);
    state.notes = state.notes.filter((note) => note.notesId != action.payload);
  });
  builder.addCase(postNotesRedux, (state, action) => {
    state.notes.push(action.payload);
  });
  builder.addCase(updateNoteRedux, (state, action) => {
    let idx = state.notes.findIndex(
      (note) => note.notesId == action.payload.noteId
    );
    state.notes[idx].text = action.payload.text;
    state.notes[idx].date = action.payload.date;
  });
});
