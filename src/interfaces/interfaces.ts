export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | string | undefined;
}

export interface CountryData {
  country: string;
  iso_code?: string;
  data: YearlyData[];
}

export interface CO2Data {
  [key: string]: CountryData;
}
