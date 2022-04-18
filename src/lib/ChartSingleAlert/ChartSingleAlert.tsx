import { Paper, useEventCallback } from "@mui/material";
import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./ChartSingleAlert.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAnotherChartDataAction,
  getChartDataAction,
} from "../../redux/actions/ChartActions";

const ChartSingleAlert = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const getChartData = async () => {
      console.log("i fireee");
      await dispatch(getChartDataAction());
      setLoading(false);
    };
    getChartData();
  }, []);

  let storedAlertList = JSON.parse(localStorage.getItem("alertList")!);
  const navigatorData = storedAlertList.map(
    (elem: { date: string | number | Date }) => {
      return [new Date(elem.date).getTime(), 0];
    }
  );

  const chartData = useAppSelector((state) => state.chart.list);

  const options = {
    series: [
      {
        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1D",
        },
        {
          type: "day",
          count: 3,
          text: "3D",
        },
        {
          type: "day",
          count: 7,
          text: "7D",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
      ],
      // selected: 1,
    },
    navigator: {
      enabled: false,
    },
    scrollbars: {
      enabled: true,
    },
  };

  return !isLoading ? (
    <div className={styles.chartContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  ) : (
    <></>
  );
};

export default ChartSingleAlert;