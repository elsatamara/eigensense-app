import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./NavigatorRemote.module.css";
import React, { useRef } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAnotherChartDataAction } from "../../redux/actions/ChartActions";

interface Props {
  setChartRange: (max: number) => void;
}

const NavigatorRemoteDemo = ({ setChartRange }: Props) => {
  let storedAlertList = JSON.parse(localStorage.getItem("alertList")!);
  const navigatorData = storedAlertList
    .map((elem: { date: string | number | Date }) => {
      return [new Date(elem.date).getTime(), 50];
    })
    .sort();

  const navRef = useRef();

  const dispatch = useAppDispatch();
  const options = {
    title: {
      text: "Regulator Remote",
      x: -410,
      y: 50,
    },
    chart: {
      height: 215,
      width: 996,
      spacingTop: -20,
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
        y: 0,
        x: -110,
      },
      inputPosition: {
        y: -33,
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
          click: (e: any) => {
            setChartRange(e.point.options.x);
          },
        },
      },
    },
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
