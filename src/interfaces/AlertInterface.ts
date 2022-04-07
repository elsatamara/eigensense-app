import { AlertStatus } from "../utils/AlertStatus";

export interface AlertInterface {
  patternId: string;
  patternName: string;
  date: Date;
  location: string;
  regulator: string;
  status: AlertStatus;
  preview: string;
  dateLastOpened: Date;
  chartData: number[][];
}

export interface AlertListInterface {
  alerts: AlertInterface[];
  isDrawerOpen: boolean;
}
