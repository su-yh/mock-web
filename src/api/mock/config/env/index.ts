import request from '@/utils/request'
import {ResponseBase, PageResult} from "@/api/base/types";
import {MockEnvConfigEntity} from "./types";
import {PageParams} from "../../../base/types";

enum API {
  LIST_PAGE_URL = '/platform/env/listPage',
  CREATE_URL = '/platform/env/create',
  UPDATE_URL = '/platform/env/update',
  DELETE_URL = '/platform/env/delete',
  STATUS_SWITCH_URL = '/platform/env/statusSwitch',
}

export const listPageReq = (pageParams: PageParams) => request.get<PageParams, ResponseBase<PageResult<MockEnvConfigEntity>>>(API.LIST_PAGE_URL, {params: pageParams});
export const createReq = (entity: MockEnvConfigEntity) => request.post<MockEnvConfigEntity, ResponseBase>(API.CREATE_URL, entity);
export const updateReq = (entity: MockEnvConfigEntity) => request.post<MockEnvConfigEntity, ResponseBase>(API.UPDATE_URL, entity);
export const deleteReq = (id: string) => request.post<number | string, ResponseBase>(API.DELETE_URL, {id});
export const statusSwitchReq = (id: string, enabled: boolean) => request.post<any, ResponseBase>(API.STATUS_SWITCH_URL, {id: id, enabled: enabled});

