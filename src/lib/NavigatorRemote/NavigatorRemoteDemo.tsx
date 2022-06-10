import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./NavigatorRemote.module.css";
import React from "react";

const NavigatorRemoteDemo = () => {
  let storedAlertList = JSON.parse(localStorage.getItem("alertList")!);
  const navigatorData = storedAlertList
    .map((elem: { date: string | number | Date }) => {
      return [new Date(elem.date).getTime(), 50];
    })
    .sort();
  const options = {
    title: { text: "Regulator Remote", x: -410, y: 20, margin: 0 },
    chart: {
      height: 270,
      width: 996,
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
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    rangeSelector: {
      buttonPosition: {
        align: "right",
        y: -15,
        x: -110,
        margin: 0,
      },
      inputPosition: {
        y: -47,
        margin: 0,
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
    navigator: {
      series: {
        type: "scatter",
        lineWidth: 0,
        marker: {
          enabled: true,
          radius: 7,
        },
      },
    },
    // yAxis: {
    //   height: 0,
    //   gridLineWidth: 0,
    //   labels: {
    //     enabled: false,
    //   },
    // },
    tooltip: {
      enabled: false,
    },
    scrollbars: {
      enabled: true,
    },
  };
  return (
    <div className={styles.navigatorContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default NavigatorRemoteDemo;
