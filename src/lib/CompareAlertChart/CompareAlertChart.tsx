import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const CompareAlertChart = () => {
  const chartComponent = React.useRef(null);
  const chartData = useAppSelector((state) => state.compareChart.list);
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
    },
    navigator: {
      enabled: false,
    },
    scrollbars: {
      enabled: true,
    },
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        allowChartUpdate={true}
        options={options}
        ref={chartComponent}
      />
    </div>
  );
};

export default CompareAlertChart;
