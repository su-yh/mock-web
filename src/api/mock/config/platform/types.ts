
export enum MockModeEnums {
  NONE = 0,
  TIMER_JOB = 1,
  DATE_RANGE = 2,
  // TS_RANGE = 3,
}


export interface MockPropertiesEntity {
  id?: string,
  env?: string,
  mode?: MockModeEnums,
  tsBegin?: number,
  tsEnd?: number,
  subChannelCount?: number,
  randomMaxRegistry?: number,
  randomMaxLogin?: number,
  randomMaxRecharge?: number,
  randomMaxWithdrawal?: number,
  created?: string,
  updated?: string,
}


