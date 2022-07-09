import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props {
  chartData: number[][] | undefined;
}

const CompareAlertChart = ({ chartData }: Props) => {
  const chartComponent = React.useRef(null);
  console.log("chart data", chartData);
  // const chartData = useAppSelector((state) => state.compareChart.list);
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
          type: "second",
          count: 1,
          text: "1S",
        },
        {
          type: "second",
          count: 3,
          text: "3S",
        },
        {
          type: "minute",
          count: 1,
          text: "1M",
        },
        {
          type: "minute",
          count: 3,
          text: "3M",
        },
      ],
    },
    navigator: {
      enabled: false,
    },
    scrollbars: {
      enabled: true,
    },
  };
  return chartData ? (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      allowChartUpdate={true}
      options={options}
      ref={chartComponent}
    />
  ) : (
    <></>
  );
};

export default CompareAlertChart;
