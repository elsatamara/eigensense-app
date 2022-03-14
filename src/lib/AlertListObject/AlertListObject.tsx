import { Button } from "@mui/material";
import { StylesContext } from "@mui/styles";
import React, { useEffect } from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { useAppDispatch } from "../../redux/hooks";
import { AlertStatus } from "../../utils/AlertStatus";
import styles from "./AlertListObject.module.css";

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
  return (
    <div>
      <div>{regulator}</div>
      <div>{<img src={preview} className={styles.preview} />}</div>
    </div>
  );
};

export default AlertListObject;
