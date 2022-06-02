export interface CustomFilterInterface {
  name: string;
  location: string[];
  customFilterId?: string;
  agent: string[];
  queue: string[];
  status: string[];
  type: string[];
  from: null | number;
  to: null | number;
}

export interface CustomFilterListInterface {
  customFilterList: CustomFilterInterface[];
}
