import request from '@/utils/request'
import {ResponseBase, PageParams, PageResult} from "@/api/base/types";
import {EnvDatasourcePropertiesEntity} from './types'

enum API {
  LIST_PAGE_URL = '/env/datasource/listPage',
  CREATE_URL = '/env/datasource/create',
  UPDATE_URL = '/env/datasource/update',
  DELETE_URL = '/env/datasource/delete',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<EnvDatasourcePropertiesEntity>>>(API.LIST_PAGE_URL, {params: pageParams})
export const createReq = (entity: EnvDatasourcePropertiesEntity) => request.post<EnvDatasourcePropertiesEntity, ResponseBase>(API.CREATE_URL, entity)
export const updateReq = (entity: EnvDatasourcePropertiesEntity) => request.post<EnvDatasourcePropertiesEntity, ResponseBase>(API.UPDATE_URL, entity);
export const deleteReq = (id: string) => request.post<string, ResponseBase>(API.DELETE_URL, {id})


