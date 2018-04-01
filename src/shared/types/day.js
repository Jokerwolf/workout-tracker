//@flow
import type { TagTp } from './tag';

type DayTp = {
  date: number,
  tags?: Array<TagTp>
};
type EmptyDayTp = {date: typeof undefined};
type DaysTp = {
  [dayKey: string]: DayTp;
  flatDays: Array<DayTp | EmptyDayTp>
};

export type { DayTp, EmptyDayTp, DaysTp };
