import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useAppSelector } from "../../redux/hooks";

// const PressureChart = () => {
//   const chartState = useAppSelector((state) => state.chart);

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Chart.js Line Chart",
//       },
//     },
//     options: {
//       scales: {
//         x: {
//           type: "time",
//           time: {
//             displayFormats: {
//               quarter: "MMM YYYY",
//             },
//           },
//           min: new Date("2015-08-25"),
//           max: new Date("2015-08-25"),
//         },
//         y: {
//           type: "linear",
//           min: -6,
//           max: 7,
//         },
//       },
//     },
//   };

//   let labels: string[] = [];
//   chartState.datetime.map((elem) => {
//     var transformed = new Date(elem).toTimeString();
//     labels.push(transformed.slice(0, 8));
//   });

//   console.log(labels);
//   // var testdate = new Date(labels[0]);
//   // console.log(testdate.toTimeString());

//   const number = chartState.pressure;
//   console.log(number);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: number,
//         borderColor: "rgb(53, 162, 235)",
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//       },
//     ],
//   };

//   return (
//     <div>
//       <Line options={options} data={data} />
//     </div>
//   );
// };

// export default PressureChart;
