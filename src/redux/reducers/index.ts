import { alertList } from "./AlertListReducer";
import { chart } from "./ChartReducer";
import { customFilter } from "./CustomFilterReducer";
import { notesList } from "./NotesReducer";
import { patternList } from "./PatternListReducer";

export const rootReducer = {
  reducer: { alertList, notesList, chart, customFilter, patternList },
};
