export interface SimilarPatternInterface {
  patternId: string;
  patternName: string;
  preview: string;
  matchScore: number;
  date: Date;
  startTime: Date;
  location: string;
  regulator: string;
}

export interface SimilarPatternListInterface {
  similarPatternList: SimilarPatternInterface[];
}
