// export interface ChartDataInterface {
//   DateTime: Date;
//   Pressure: number;
//   RegName: string;
//   temperature: number;
//   logpressure: number;
//   dayofweek: number;
//   julian: number;
//   hour: number;
//   julianhour: number;
//   prediction: number;
//   predictionlow: number;
//   predicitonhigh: number;
//   purpleflags: number;
//   purplerun: number;
//   collapsedpurpleflags: number;
//   yellowflags: number;
//   redflags: number;
//   alertflags: number;
//   mostrecentupdate: number;
//   stderror: number;
//   dlerorr: number;
// }

export interface ChartDataInterface {
  [regulator: string]: number[];
}

export interface ChartDataListInterface {
  chartData: number[][];
}
