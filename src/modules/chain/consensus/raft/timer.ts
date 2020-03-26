export enum timerType {
  NORMAL,
  RESETEABLE,
  INTERVAL,
}

export interface Timer {
  reset(): void;
  start(): void;
  cancel(): void;
}

export interface ITimerFactory {
  create(type: timerType): Timer
}