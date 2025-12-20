<template>

  <el-card>

    <el-card>
      <el-form :inline="true" class="search_form">
        <el-form-item label="用户名：">
          <el-input v-model="nameLike" placeholder="搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="searchPageList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<!--    <el-button type="primary" :icon="Plus" @click="createTrademark">添加品牌</el-button>-->

    <el-table border style="width: 100%; margin: 10px 0" :data="entitiesPageData.list">
      <el-table-column label="序号" width="80" align="center" type="index"/>
      <el-table-column label="贷款类型">
        <template #default="scope">
          {{ getLoanTypeLabel(scope.row.loanType) }}
        </template>
      </el-table-column>
      <el-table-column label="还款期数" prop="repaymentPeriod"/>
      <el-table-column label="还款日期" prop="actualRepaymentDate"/>
      <el-table-column label="还款本金" prop="actualPrincipal"/>
      <el-table-column label="还款利息" prop="actualInterest"/>
      <el-table-column label="逾期费用" prop="actualOverdueFee"/>
      <el-table-column label="实际还款总金额" prop="actualTotal"/>
      <el-table-column label="剩余贷款" prop="remainingLoanAmount"/>
      <el-table-column label="实际LPR" prop="actualLPR"/>
      <el-table-column label="实际BP" prop="actualBP"/>
      <el-table-column align="center" label="实际利率">
        <template #default="scope">
          {{ calculateRate(scope.row.actualLPR, scope.row.actualBP) }}
        </template>
      </el-table-column>
      <el-table-column label="实时LPR" prop="realtimeLPR"/>
      <el-table-column label="实时BP" prop="realtimeBP"/>
      <el-table-column label="备注" prop="remark"/>
      <el-table-column align="center" label="创建时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.created) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.updated) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="name">
        <template #default="{row, $index}">
          <el-button type="primary" :icon="Edit" @click="updateEntity(row)"/>
          <el-popconfirm title="确定要删除吗？" @confirm="deleteEntity(row.id)">
            <template #reference>
              <el-button type="primary" :icon="Delete" color="red"/>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageParam.pageNo"
        v-model:page-size="pageParam.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :size="'default'"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="entitiesPageData.total"
        @size-change="listPageMortgage"
        @current-change="listPageMortgage"
    />
  </el-card>

</template>


<script setup lang="ts">

import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {getLoanTypeLabel, MortgageRepaymentEntity} from "@/api/mortgage/repayment/types";
import {ListPageParams, ResponseBase} from '@/api/base/types'
import {PageResult} from "@/api/base/types";
import {ElMessage, UploadProps} from "element-plus";
import {pageListMortgageRepayment} from "@/api/mortgage/repayment";
import {calculateRate} from "@/api/base";

let nameLike = ref<string>('');

let pageParam = reactive<ListPageParams>({
  pageNo: 1, pageSize: 10
});

let entitiesPageData: PageResult<MortgageRepaymentEntity> = reactive<PageResult<MortgageRepaymentEntity>>({total: 0, list: []})

onMounted(() => {
  listPageMortgage();
});

// 调用查询
const listPageMortgage = async () => {
  const response: ResponseBase<PageResult<MortgageRepaymentEntity>> = await pageListMortgageRepayment(pageParam);
  console.log(`response: ${response}`)
  if (response.code == 0) {
    const pr: PageResult<MortgageRepaymentEntity> = response.data;
    entitiesPageData.total = pr.total;
    entitiesPageData.list = pr.list;
  } else {
    console.log(`response.code = ${response.code}`)
  }
}

const updateEntity = (entity: MortgageRepaymentEntity) => {
  console.log(`update entity: ${entity}`)
}

const deleteEntity = (id: number) => {
  console.log(`delete entity by id: ${id}`)
}

const searchPageList = async () => {
  await listPageMortgage();
}

const formatDate = (date: Date | string | number) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


</script>


<style scoped lang="scss">

</style>