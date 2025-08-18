<template>
  <el-card style="margin-bottom: 10px">Hi: Platform Config</el-card>
  <el-card>
    <el-table border :data="pageResult.list">
      <el-table-column align="center" label="序号" type="index" width="80px"/>
      <el-table-column align="center" label="env" prop="env"/>
      <el-table-column align="center" label="mode" prop="mode"/>
      <el-table-column align="center" label="开始时间" prop="tsBegin" :formatter="formatTimestamp"/>
      <el-table-column align="center" label="结束时间" prop="tsEnd" :formatter="formatTimestamp"/>
      <el-table-column align="center" label="子渠道数量" prop="subChannelCount"/>
      <el-table-column align="center" label="每次最大注册数量" prop="randomMaxRegistry" width="120px"/>
      <el-table-column align="center" label="每次最大登录数量" prop="randomMaxLogin" width="120px"/>
      <el-table-column align="center" label="每次最大充值数量" prop="randomMaxRecharge" width="120px"/>
      <el-table-column align="center" label="每次最大提现数量" prop="randomMaxWithdrawal" width="120px"/>
      <el-table-column align="center" label="创建时间" prop="created" width="180px"/>
      <el-table-column align="center" label="修改时间" prop="updated" width="180px"/>
      <el-table-column align="center" label="操作" width="200px">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit">编辑</el-button>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteItem(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {PageParams, PageResult, ResponseBase} from "@/api/base/types";
import {MockPropertiesEntity} from "@/api/mock/config/platform/types";
import {Delete, Edit} from "@element-plus/icons-vue";
import {listPageReq, createReq, updateReq, deleteReq} from "@/api/mock/config/platform";
import {ElMessage, TableColumnCtx} from "element-plus";

let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10})
let pageResult = reactive<PageResult<MockPropertiesEntity>>({total: 0, list: []});

const deleteItem = (entity: MockPropertiesEntity) => {
  console.log("删除: ", entity.id)
}

onMounted(async () => {
  await pageList();
})

const pageList = async () => {
  const result: ResponseBase = await listPageReq(pageParam);
  if (result.code != 0) {
    ElMessage({
      type: 'error',
      message: result.message
    })
    return
  }

  const data = result.data;

  pageResult.total = data.total;
  pageResult.list = data.list;
}

// 时间戳格式化函数（毫秒 -> 字符串）
const formatTimestamp = (row, column, cellValue) => {
  if (!cellValue) {
    return '--';
  }

  const date = new Date(cellValue);
  // 格式化为 yyyy-MM-dd HH:mm:ss 格式
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<style scoped>

</style>
