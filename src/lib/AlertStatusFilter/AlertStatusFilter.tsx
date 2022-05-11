import { Box, Paper, Button } from "@mui/material";
import React from "react";
import {
  changeAlertStatus,
  changeAlertStatusDb,
} from "../../redux/actions/AlertListAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./AlertStatusFilter.module.css";
import { AlertStatus } from "../../utils/AlertStatus";
import ReassignModal from "../ReassignModal/ReassignModal";

interface AlertStatusButtonProps {
  header: string;
  alertSelected: string[];
}

const AlertStatusButton = ({
  header,
  alertSelected,
}: AlertStatusButtonProps) => {
  const dispatch = useAppDispatch();
  const [isReassignModalOpen, setReassignModalOpen] = React.useState(false);
  return (
    <div>
      {header === "Reassign" ? (
        <Button onClick={() => setReassignModalOpen(true)} sx={{ m: 1 }}>
          {header}
        </Button>
      ) : (
        <Button
          id="regularAlertStatusButton"
          onClick={() => {
            dispatch(
              changeAlertStatus({
                changeAction: header as AlertStatus,
                alertToChange: alertSelected,
              })
            );
            dispatch(
              changeAlertStatusDb({
                changeAction: header as AlertStatus,
                alertToChange: alertSelected,
              })
            );
          }}
          sx={{ m: 1 }}
        >
          {header}
        </Button>
      )}
      {isReassignModalOpen ? (
        <ReassignModal
          onClose={() => {
            setReassignModalOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

interface Props {
  alertSelected: string[];
}

const AlertStatusFilter = ({ alertSelected }: Props) => {
  return (
    <Box
      sx={{
        pt: 0,
        pl: 2,
        pr: 2,
        pb: 0.3,
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 1.5, backgroundColor: "#ebf3fa", right: 0 }}
      >
        <div className={styles.alertStatusFilterContainer}>
          <div className={styles.alertStatusNumberSelected}>
            <h3>({alertSelected.length} Selected)</h3>
          </div>
          <div className={styles.alertStatusNumberSelected}>
            <h3>Select label: </h3>
          </div>
          <AlertStatusButton header={"pending"} alertSelected={alertSelected} />
          <AlertStatusButton
            header={"Reassign"}
            alertSelected={alertSelected}
          />
          <AlertStatusButton
            header={"suppressed"}
            alertSelected={alertSelected}
          />
          <AlertStatusButton header={"closed"} alertSelected={alertSelected} />
        </div>
      </Paper>
    </Box>
  );
};

export default AlertStatusFilter;
