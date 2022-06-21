import { agentList } from "./AgentReducer";
import { alertList } from "./AlertListReducer";
import { chart } from "./ChartReducer";
import { compareChart } from "./CompareChartReducer";
import { customFilterList } from "./CustomFilterListReducer";
import { customFilter } from "./CustomFilterReducer";
import { notesList } from "./NotesReducer";
import { notificationList } from "./NotificationListReducer";
import { patternList } from "./PatternListReducer";
import { similarPatternList } from "./SimilarPatternReducer";

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
    similarPatternList,
    compareChart,
  },
};
