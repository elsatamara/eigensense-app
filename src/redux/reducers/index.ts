import { agentList } from "./AgentReducer";
import { alertList } from "./AlertListReducer";
import { chart } from "./ChartReducer";
import { customFilterList } from "./CustomFilterListReducer";
import { customFilter } from "./CustomFilterReducer";
import { notesList } from "./NotesReducer";
import { notificationList } from "./NotificationListReducer";
import { patternList } from "./PatternListReducer";

export const rootReducer = {
  reducer: {
    alertList,
    notesList,
    chart,
    customFilter,
    patternList,
    notificationList,
    agentList,
    customFilterList,
  },
};
