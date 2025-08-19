
export enum DataSourceEnums {
  FLINK_CDS = 'flink-cds',
  FLINK_PG_CDAP = 'flink-pg-cdap',
}

export interface EnvDatasourcePropertiesEntity {
  id?: string,
  env?: string,
  dataSourceName?: DataSourceEnums,
  jdbcUrl?: string,
  username?: string,
  password?: string,
  driverClassName?: string,
  flywayEnabled?: boolean,
  created?: string,
  updated?: string,
}
