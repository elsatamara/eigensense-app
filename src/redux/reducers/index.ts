import { alertList } from "./AlertListReducer";
import { chart } from "./ChartReducer";
import { notesList } from "./NotesReducer";

export const rootReducer = {
  reducer: { alertList, notesList, chart },
};
