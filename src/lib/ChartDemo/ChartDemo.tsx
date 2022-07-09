import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getChartCSV } from "../../redux/actions/ChartActions";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./ChartDemo.module.css";
import BeatLoader from "react-spinners/BeatLoader";

const ChartDemo = () => {
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getChartData = async () => {
      await dispatch(getChartCSV());
      setLoading(false);
    };
    getChartData();
  }, []);

  const chartCSVState = useAppSelector(
    (state) => state.chartCSVList.chartCSVList
  );

  const chartData = chartCSVState.map((elem) => {
    return [elem[0], elem[1]];
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

    plotOptions: {
      series: {
        turboThreshold: 10000,
      },
    },

    rangeSelector: {
      buttons: [
        {
          type: "second",
          count: 1,
          text: "1s",
        },
        {
          type: "second",
          count: 3,
          text: "3s",
        },
        {
          type: "second",
          count: 10,
          text: "10s",
        },
        {
          type: "minute",
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
  return isLoading ? (
    <div className={styles.loaderContainer}>
      <BeatLoader color={"#2196f3"} size={12} />
    </div>
  ) : (
    <div className={styles.chartContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default ChartDemo;
