//@flow
import type { DaysTp } from './day';

type MonthTp = {
  index: number;
  name: string;
  days: DaysTp
};
type MonthsTp = {
  [monthKey: string]: MonthTp,
  flatMonths: Array<MonthTp>;
};

export type { MonthTp, MonthsTp };
