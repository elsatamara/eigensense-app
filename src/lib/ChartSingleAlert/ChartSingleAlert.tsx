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
}

const ChartSingleAlert = ({ regulatorName }: Props) => {
  const dispatch = useAppDispatch();

  const chartData = JSON.parse(localStorage.getItem("regulatorMap")!)[
    regulatorName
  ];

  // const [chartData, setChartData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // useEffect(() => {
  //   if (data) {
  //     setChartData(data);
  //     setIsLoading(false);
  //   }
  // }, [data]);

  const [chartMinOptions, setMinOptions] =
    React.useState<number>(1461276997000);
  const [chartMaxOptions, setMaxOptions] =
    React.useState<number>(1461327855000);

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
      min: chartMinOptions,
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
          setMinOptions(1440532499000);
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
