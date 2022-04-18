import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./NavigatorRemote.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { getAnotherChartDataAction } from "../../redux/actions/ChartActions";
import { never_used } from "immer/dist/internal";

const NavigatorRemote = () => {
  let storedAlertList = JSON.parse(localStorage.getItem("alertList")!);
  console.log("N", storedAlertList);
  const navigatorData = storedAlertList
    .map((elem: { date: string | number | Date }) => {
      return [new Date(elem.date).getTime(), 0];
    })
    .sort();

  const dispatch = useAppDispatch();
  const navigatorOptions = {
    title: { text: "Regulator Remote", x: -410, y: 20 },
    chart: {
      height: 150,
      width: 996,
    },
    tooltip: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    yAxis: {
      height: 0,
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
    },

    xAxis: {
      lineWidth: 0,
      tickLength: 0,
      labels: {
        enabled: false,
      },
    },

    navigator: {
      enabled: false,
    },

    plotOptions: {
      series: {
        allowPointSelect: true,
        marker: {
          states: {
            select: {
              fillColor: "red",
              lineWidth: 0,
            },
          },
        },
        events: {
          click: () => {
            dispatch(getAnotherChartDataAction());
          },
        },
      },
    },

    series: [
      {
        lineWidth: 0,
        marker: {
          enabled: true,
          radius: 7,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
        data: navigatorData,
      },
    ],

    rangeSelector: {
      buttonPosition: {
        align: "right",
        y: -30,
        x: -100,
      },
      inputPosition: {
        y: -60,
      },
      dropdown: "never",
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
    },
  };
  return (
    <div className={styles.navigatorContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={navigatorOptions}
      />
    </div>
  );
};

export default NavigatorRemote;
