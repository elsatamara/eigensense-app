import { AlertStatus } from "../utils/AlertStatus";

export interface AlertInterface {
  alertType: string;
  keyAttribute: string;
  alertQueue: string;
  agentName: string;
  patternId: string;
  patternName: string;
  startTime: string;
  eventStarts: string;
  date: string;
  location: string;
  regulator: string;
  status: AlertStatus;
  preview: string;
  dateLastOpened: Date;
  previewData: (number | Date)[][];
}

export interface AlertListInterface {
  alerts: AlertInterface[];
  isDrawerOpen: boolean;
}
