import request from "@/utils/request";
import {loginFormData, UserInfoEntity} from "./types";
import {ResponseBase} from '@/api/base/types';

enum API {
  LOGIN_URL = '/user/login',
  LOGOUT_URL = '/user/logout',
  USERINFO_URL = '/user/info',
}

export const reqLogin = (data: loginFormData) => request.post<any, ResponseBase<string>>(API.LOGIN_URL, data);
export const reqLogout = () => request.post<any, ResponseBase>(API.LOGOUT_URL);
export const reqUserInfo = () => request.get<any, ResponseBase<UserInfoEntity>>(API.USERINFO_URL);
