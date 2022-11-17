interface Info {
  statistic: string;
  data: string;
}
export interface Card {
  sensor: number | string;
  info: Info[];
  description?: string;
  unit?: string[];
  standardDescriptionWord?: string;
  computed?: boolean;
  normalValue?: number;
}
