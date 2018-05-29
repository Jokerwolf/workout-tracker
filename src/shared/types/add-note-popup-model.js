//@flow
import type { NoteTp } from './note';

type AddNotePopupModelTp = {
  uniqueKey: string,
  monthKey: number | string,
  dayKey: number | string,
  notes: Array<NoteTp>
};

export type { AddNotePopupModelTp };
