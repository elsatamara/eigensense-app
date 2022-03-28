import { alertList } from "./AlertListReducer";
import { notesList } from "./NotesReducer";

export const rootReducer = {
  reducer: { alertList, notesList },
};
