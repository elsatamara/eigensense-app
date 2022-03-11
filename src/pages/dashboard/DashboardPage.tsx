import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AlertListObject from "../../lib/AlertListObject/AlertListObject";
import DashboardTableHeader from "../../lib/DashboardTableHeader/DashboardTableHeader";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import PageTabs from "../../lib/Tabs/Tabs";
import { getAlertsList } from "../../redux/actions/AlertListAction";
import { addNotesAction } from "../../redux/actions/ChartActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { alertList } from "../../redux/reducers/AlertListReducer";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [isChartAvailable, setChartAvailable] = React.useState(false);
  const [notesData, setNotesData] = React.useState("");
  const alertListState = useAppSelector((state) => state.alertList);

  console.log("Alert", alertListState);

  useEffect(() => {
    dispatch(getAlertsList());
  }, []);
  return (
    <div>
      <div className={styles.headerContainer}>
        <HeaderBar />
      </div>
      <div className={styles.drawerContainer}>
        <PageTabs />
      </div>
      <div className={styles.tableHeaderContainer}>
        <DashboardTableHeader />
      </div>

      <div>
        {alertListState.alerts.map((elem) => {
          return (
            <li key={elem.patternId}>
              <AlertListObject
                patternName={elem.patternName}
                patternID={elem.patternId}
                date={elem.date}
                preview={elem.preview}
                location={elem.location}
                regulator={elem.regulator}
                status={elem.status}
              />
            </li>
          );
        })}
      </div>

      {/* <div className={styles.pressureChartContainer}>
        {isChartAvailable ? <PressureChart /> : null}
      </div> */}

      <div>
        {/* <Button
          onClick={() => {
            dispatch(getAlertsList());
          }}
        >
          {" "}
          Get Alerts List{" "}
        </Button> */}
      </div>
      {/* <div>
        <TextField
          id="notes-textbox"
          value={notesData}
          onChange={(e) => setNotesData(e.target.value)}
          multiline
        />
        <Button
          form="notes-form"
          onClick={() => {
            if (notesData != "") {
              dispatch(addNotesAction(notesData));
            }
          }}
        >
          Add notes
        </Button>
      </div> */}
    </div>
  );
};

export default DashboardPage;
