import request from '@/utils/request'
import {ResponseBase, PageParams, PageResult} from "@/api/base/types";
import {DataSourceEnums, EnvDatasourcePropertiesEntity} from './types'

enum API {
  LIST_PAGE_URL = '/env/datasource/listPage',
  QUERY_DATASOURCE_BY_ENV_URL = '/env/datasource/queryDataSourceByEnv',
  CREATE_URL = '/env/datasource/create',
  UPDATE_URL = '/env/datasource/update',
  DELETE_URL = '/env/datasource/delete',
  FLYWAY_SWITCH_URL = '/env/datasource/switchFlywayEnable',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<EnvDatasourcePropertiesEntity>>>(API.LIST_PAGE_URL, {params: pageParams})
export const queryDataSourceByEnvReq = (env: string, dataSourceName: DataSourceEnums) => request.get<any, ResponseBase<EnvDatasourcePropertiesEntity>>(API.QUERY_DATASOURCE_BY_ENV_URL, {params: {env, dataSourceName}})
export const createReq = (entity: EnvDatasourcePropertiesEntity) => request.post<EnvDatasourcePropertiesEntity, ResponseBase>(API.CREATE_URL, entity)
export const updateReq = (entity: EnvDatasourcePropertiesEntity) => request.post<EnvDatasourcePropertiesEntity, ResponseBase>(API.UPDATE_URL, entity);
export const deleteReq = (id: string) => request.post<string, ResponseBase>(API.DELETE_URL, {id})
export const flywaySwitchReq = (id: string, enabled: boolean) => request.post<any, ResponseBase>(API.FLYWAY_SWITCH_URL, {id, enabled})


