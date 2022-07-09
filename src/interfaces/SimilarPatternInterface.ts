export interface SimilarPatternInterface {
  patternId: string;
  patternName: string;
  preview: string;
  matchScore: number;
  date: Date;
  startTime: Date;
  location: string;
  regulator: string;
  agent: string;
  alertType: string;
  keyAttribute: string;
}

export interface SimilarPatternListInterface {
  similarPatternList: SimilarPatternInterface[];
}

export interface SimilarPatternAlgoInterface {
  patternId: string;
  patternName: string;
  date: Date;
  startTime: Date;
  preview: string;
  location: string;
  regulator: string;
  agent: string;
  matchScore: number;
  dataPoints: number[][];
}

export interface SimilarPatternAlgoListInterface {
  similarPatternAlgoList: SimilarPatternAlgoInterface[];
}
