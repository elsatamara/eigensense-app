import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./ChartSingleAlert.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import BeatLoader from "react-spinners/BeatLoader";
import { getChartDataAction } from "../../redux/actions/ChartActions";

interface Props {
  regulatorName: string;
  chartRangeMax: number;
}

const ChartSingleAlert = ({ regulatorName, chartRangeMax }: Props) => {
  const dispatch = useAppDispatch();
  const regulatorData = JSON.parse(localStorage.getItem("regulatorMap")!)
    [regulatorName].join(",")
    .toString();

  const chartData = useAppSelector((state) => state.chart.chartData);
  console.log(chartData);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((f) => setTimeout(f, 10));
    };
    const getChart = async () => {
      await dispatch(getChartDataAction(regulatorData));
    };
    setIsLoading(true);
    setMaxOptions(chartRangeMax);
    if (chartData.length > 0) {
      delay().then(() => {
        setIsLoading(false);
      });
    } else {
      getChart().then(() => {
        setIsLoading(false);
      });
    }
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
      plotLines: [
        {
          color: "#FF0000",
          width: 2,
          value: chartMaxOptions,
        },
      ],
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
