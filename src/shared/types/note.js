//@flow
type UniqueKeyTp = {
  dayKey: string,
  monthKey: string;
};


type NoteTp = {
  uniqueKey: UniqueKeyTp,
  description: string,
  type: number;
};

type NotesTp = {
  [key: string]: Array<NoteTp>
};

export type { NoteTp, NotesTp };
