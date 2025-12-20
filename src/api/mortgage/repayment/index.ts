import request from '@/utils/request';
import {ListPageParams, ResponseBase, PageResult} from "@/api/base/types";
import {MortgageRepaymentEntity} from "./types";

enum API {
  MORTGAGE_REPAYMENT_PAGE_LIST_URL = '/mortgage/repayment/page/list',
}

export const pageListMortgageRepayment = (params: ListPageParams)  => request.get<any, ResponseBase<PageResult<MortgageRepaymentEntity>>>(API.MORTGAGE_REPAYMENT_PAGE_LIST_URL, {params});


