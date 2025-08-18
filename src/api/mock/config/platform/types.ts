
export enum MockModeEnums {
  NONE,
  TIMER_JOB,
  DATE_RAGE,
  TS_RANGE,
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


