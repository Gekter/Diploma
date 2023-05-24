export type EventType =
  | 'ONTASKADD'
  | 'ONTASKUPDATE'
  | 'ONTASKCOMMENTADD'
  | 'ONTASKCOMMENTUPDATE';

export class Event {
  event: EventType;
  data: {
    FIELDS_AFTER: {
      ID: string;
      TASK_ID?: string;
    };
  };
  ts: string;
}
