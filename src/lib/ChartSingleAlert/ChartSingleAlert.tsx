import { Button, Paper, useEventCallback } from "@mui/material";
import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./ChartSingleAlert.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAnotherChartDataAction,
  getChartDataAction,
} from "../../redux/actions/ChartActions";
import BeatLoader from "react-spinners/BeatLoader";

interface Props {
  regulatorName: string;
  chartRangeMax: number;
}

const ChartSingleAlert = ({ regulatorName, chartRangeMax }: Props) => {
  const dispatch = useAppDispatch();

  const chartData = JSON.parse(localStorage.getItem("regulatorMap")!)[
    regulatorName
  ];

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((f) => setTimeout(f, 10));
    };
    setIsLoading(true);
    setMaxOptions(chartRangeMax);
    delay().then(() => {
      setIsLoading(false);
    });
  }, [chartRangeMax]);

  const [chartMaxOptions, setMaxOptions] = React.useState<number>(0);

  const option = {
    series: [
      {
        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    xAxis: {
      max: chartMaxOptions,
    },
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
      selected: 1,
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
      <Button
        onClick={async () => {
          setIsLoading(true);
          setMaxOptions(1440546788000);
          await new Promise((f) => setTimeout(f, 10));
          setIsLoading(false);
        }}
      >
        change max
      </Button>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={option}
      />
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <BeatLoader color={"#2196f3"} size={12} />
    </div>
  );
};

export default ChartSingleAlert;
