import request from '@/utils/request'
import {ResponseBase, PageParams, PageResult} from "@/api/base/types";
import {MockPropertiesEntity} from './types'

enum API {
  LIST_PAGE_URL = '/platform/mock/listPage',
  QUERY_PLATFORM_BY_ENV_URL = '/platform/mock/queryPlatformByEnv',
  CREATE_URL = '/platform/mock/create',
  UPDATE_URL = '/platform/mock/update',
  DELETE_URL = '/platform/mock/delete',
  START_TASK_URL = '/task/start',
  STOP_TASK_URL = '/task/stop',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<MockPropertiesEntity>>>(API.LIST_PAGE_URL, {params: pageParams})
export const queryPlatformByEnvReq = (env: string) => request.get<string, ResponseBase<MockPropertiesEntity>>(API.QUERY_PLATFORM_BY_ENV_URL, {params: {env}})
export const createReq = (entity: MockPropertiesEntity) => request.post<MockPropertiesEntity, ResponseBase>(API.CREATE_URL, entity)
export const updateReq = (entity: MockPropertiesEntity) => request.post<MockPropertiesEntity, ResponseBase>(API.UPDATE_URL, entity)
export const deleteReq = (id: string) => request.post<string, ResponseBase>(API.DELETE_URL, {id});
// 请求参数，同时的query 和body 的情况，第二个参数是body，第三个参数是配置对象，在配置对象里面放 params
export const startTaskReq = (env: string) => request.post<string, ResponseBase>(API.START_TASK_URL, {}, {params: {env}});
export const stopTaskReq = (env: string) => request.post<string, ResponseBase>(API.STOP_TASK_URL, {}, {params: {env}});



