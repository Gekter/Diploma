export type LoadingStatus = "PENDING" | "FULFILLED" | "REJECTED";

export type FetchError = null | string;

export type TaskStatus = "2" | "3" | "4" | "5" | "6";

export const STATUSES = {
  "2": "Ждёт выполнения",
  "3": "Выполняется",
  "4": "Ожидает контроля",
  "5": "Завершена",
  "6": "Отложена",
};
