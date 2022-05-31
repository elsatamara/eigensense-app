export interface CustomFilterInterface {
  name: string;
  location: string[];
  agent: string[];
  queue: string[];
  status: string[];
  type: string[];
  from: undefined | number;
  to: undefined | number;
}

export interface CustomFilterListInterface {
  customFilterList: CustomFilterInterface[];
}
