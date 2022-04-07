import { Paper } from "@mui/material";
import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./ChartSingleAlert.module.css";

interface Props {
  chartData: number[][];
  date: number;
}

const ChartSingleAlert = ({ chartData, date }: Props) => {
  chartData = chartData.sort();
  let navigatorData = chartData.map(function (arr) {
    return [arr[0], 0];
  });
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
          count: 7,
          text: "7D",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
      ],
      selected: 1,
    },
    navigator: {
      series: {
        type: "scatter",
        lineWidth: 0,
        marker: {
          enabled: true,
          radius: 6,
        },
        data: navigatorData,
      },
      //   margin: 100,
      height: 20,
      opposite: true,
    },
    scrollbars: {
      enabled: true,
    },
  };
  return (
    <div className={styles.chartContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default ChartSingleAlert;
