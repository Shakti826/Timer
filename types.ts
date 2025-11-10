
export enum TimerStatus {
  IDLE,
  RUNNING,
  PAUSED,
  FINISHED,
}

export interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}
