import request from '@/utils/request'
import {ResponseBase, PageParams, PageResult} from "@/api/base/types";
import {EnvRabbitmqPropertiesEntity} from './types'

enum API {
  LIST_PAGE_URL = '/env/rabbitmq/listPage',
  QUERY_ENTITY_BY_ENV_URL = '/env/rabbitmq/queryEntityByEnv',
  CREATE_URL = '/env/rabbitmq/create',
  UPDATE_URL = '/env/rabbitmq/update',
  DELETE_URL = '/env/rabbitmq/delete',
  ENABLE_DISABLE_SWITCH_URL = '/env/rabbitmq/switchEnableDisable',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<EnvRabbitmqPropertiesEntity>>>(API.LIST_PAGE_URL, {params: pageParams});
export const queryRabbitMqEntityByEnv = (env: string) => request.get<string, ResponseBase<EnvRabbitmqPropertiesEntity>>(API.QUERY_ENTITY_BY_ENV_URL, {params: {env}})
export const createReq = (entity: EnvRabbitmqPropertiesEntity) => request.post<EnvRabbitmqPropertiesEntity, ResponseBase>(API.CREATE_URL, entity)
export const updateReq = (entity: EnvRabbitmqPropertiesEntity) => request.post<EnvRabbitmqPropertiesEntity, ResponseBase>(API.UPDATE_URL, entity)
export const deleteReq = (id: string) => request.post<string, ResponseBase>(API.DELETE_URL, {id})
export const switchRabbitMqEnableDisable = (id: string, enabled: boolean) => request.post<string, ResponseBase>(API.ENABLE_DISABLE_SWITCH_URL,
  // 请求参数，同时的query 和body 的情况，第二个参数是body，第三个参数是配置对象，在配置对象里面放 params
  {id}, {params: {enabled}})


