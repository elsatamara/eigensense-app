import React, { useEffect } from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { useAppDispatch } from "../../redux/hooks";

export interface Props {
  alert: AlertInterface;
}

const AlertListObject = ({ alert }: Props) => {
  return (
    <div>
      <h2>{alert.regulator}</h2>
    </div>
  );
};

export default AlertListObject;
