import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { useAppDispatch } from "../../redux/hooks";
import { AlertStatus } from "../../utils/AlertStatus";

export interface Props {
  patternName: string;
  patternID: string;
  date: Date;
  preview: string;
  location: string;
  regulator: string;
  status: AlertStatus;
}

const AlertListObject = ({
  patternName,
  patternID,
  date,
  preview,
  location,
  regulator,
  status,
}: Props) => {
  console.log("here");
  return <div>{regulator}</div>;
};

export default AlertListObject;
