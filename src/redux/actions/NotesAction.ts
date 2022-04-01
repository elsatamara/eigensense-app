import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
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

export const postNotes = createAsyncThunk(
  "NotesReducer/PostNotes",
  async (params: NotesInterface) => {
    let date = params.date;
    let notesId = params.notesId;
    let patternId = params.patternId;
    let agent = params.agent;
    let text = params.text;
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/postNotes/${patternId}/${notesId}/${date}/${agent}/${text}`
    );
  }
);

export const postNotesRedux = createAction<NotesInterface>("POST_NOTES_REDUX");

export const deleteNote = createAsyncThunk(
  "NotesReducer/DeleteNote",
  async (params: any) => {
    let noteId = params.noteId;
    let patternId = params.patternId;
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/deleteNote/${noteId}/${patternId}`
    );
  }
);
export const deleteNoteRedux = createAction<string>("DELETE_NOTE_REDUX");

export const updateNote = createAsyncThunk(
  "NotesReducer/UpdateNote",
  async (params: any) => {
    let date = params.date;
    let noteId = params.noteId;
    let text = params.text;
    await axiosServerRequest<any>(
      Methods.POST,
      `api/v1/updateNote/${noteId}/${text}/${date}`
    );
  }
);

export const updateNoteRedux =
  createAction<{ noteId: string; text: string; date: Date }>(
    "UPDATE_NOTE_REDUX"
  );
