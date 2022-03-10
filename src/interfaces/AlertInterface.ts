import { AlertStatus } from "../utils/AlertStatus";

export interface AlertInterface {
  patternId: number;
  patternName: string;
  chartDates: Date[];
  chartPressures: Number[];
  date: Date;
  location: string;
  regulator: string;
  notes: string;
  status: AlertStatus;
  preview: string;
}

export interface AlertListInterface {
  alerts: AlertInterface[];
}
