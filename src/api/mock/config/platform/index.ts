import request from '@/utils/request'
import {ResponseBase, PageParams, PageResult} from "@/api/base/types";
import {MockPropertiesEntity} from './types'

enum API {
  LIST_PAGE_URL = '/platform/mock/listPage',
  QUERY_PLATFORM_BY_ENV_URL = '/platform/mock/queryPlatformByEnv',
  CREATE_URL = '/platform/mock/create',
  UPDATE_URL = '/platform/mock/update',
  DELETE_URL = '/platform/mock/delete',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<MockPropertiesEntity>>>(API.LIST_PAGE_URL, {params: pageParams})
export const queryPlatformByEnvReq = (env: string) => request.get<string, ResponseBase<MockPropertiesEntity>>(API.QUERY_PLATFORM_BY_ENV_URL, {params: {env}})
export const createReq = (entity: MockPropertiesEntity) => request.post<MockPropertiesEntity, ResponseBase>(API.CREATE_URL, entity)
export const updateReq = (entity: MockPropertiesEntity) => request.post<MockPropertiesEntity, ResponseBase>(API.UPDATE_URL, entity)
export const deleteReq = (id: string) => request.post<string, ResponseBase>(API.DELETE_URL, {id});



