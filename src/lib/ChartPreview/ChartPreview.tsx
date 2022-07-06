import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

interface Props {
  previewData: number[][];
}

const ChartPreview = ({ previewData }: Props) => {
  const defaultOptions = {
    chart: {
      backgroundColor: null,
      borderWidth: 0,
      type: "area",
      margin: [30, 0, 2, 0],
      width: 120,
      height: 60,
      style: {
        overflow: "visible",
      },
      // spacingTop: -20,

      // small optimalization, saves 1-2 ms each sparkline
      skipClone: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [0],
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      tickPositions: [0],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // backgroundColor: "white",
      borderWidth: 1,
      hideDelay: 0,
      shared: true,
      useHTML: true,
      percentageDecimals: 2,
      backgroundColor: "rgba(255,255,255,1)",
      padding: 2,
      borderColor: "silver",
      borderRadius: 3,
      positioner: function (w: any, h: any, point: any) {
        return { x: point.plotX - w / 3, y: point.plotY - h };
      },
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2,
            },
          },
        },
        fillOpacity: 0.25,
      },
      column: {
        negativeColor: "#910000",
        borderColor: "silver",
      },
    },

    series: [
      {
        data: previewData,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={defaultOptions} />;
};

export default ChartPreview;
