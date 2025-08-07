
<template>
  <el-card>
    <h1>Hi: Mock Config Env</h1>
  </el-card>
  <el-card class="card">
    <el-button class="btn_create" type="primary" @click="createEnv">添加环境</el-button>
    <el-table class="table" border :data="pageResult.list">
      <el-table-column align="center" label="序号" type="index" width="80px"/>
      <el-table-column align="center" label="env" prop="env" width="200px"/>
      <el-table-column align="center" label="描述" prop="description" />
      <el-table-column align="center" label="启用/禁用" prop="enabled" width="140px">
        <template #default="scope">
          <el-switch
              v-model="scope.row.enabled"
              @change="handleStatusChange(scope.row)"
            />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="created" width="180px"/>
      <el-table-column align="center" label="修改时间" prop="updated" width="180px"/>
      <el-table-column align="center" label="操作" width="280px">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editEnv(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteEnv(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageParam.pageNo"
        v-model:page-size="pageParam.pageSize"
        :page-sizes="[1, 5, 10, 20, 50, 100]"
        :size="'default'"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="pageResult.total"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandle"
    />
  </el-card>
</template>

<script setup lang="ts">
import {reactive, onMounted} from 'vue'
import {MockEnvConfigEntity} from "@/api/mock/config/env/types";
import {Delete, Edit} from "@element-plus/icons-vue";
import {PageParams, PageResult} from "@/api/base/types";

let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10});
let pageResult = reactive<PageResult<MockEnvConfigEntity>>({total: 0, list: []});

onMounted(() => {
  pageList();
})

const pageList = async () => {
  // TODO: suyh - 待实现
  pageResult.list = [{
    id: "1",
    env: 'suyh',
    description: '',
    enabled: true,
    created: '2025-08-07 10:00:00',
    updated: '2025-08-07 10:00:00',
  }]
  pageResult.total = 100
}

const createEnv = () => {
  console.log("点击：添加环境按钮")
}
const editEnv = (row: MockEnvConfigEntity) => {
  console.log(`编辑，id: ${row.id}, env: ${row.env}, enabled: ${row.enabled}`)
}
const deleteEnv = (row: MockEnvConfigEntity) => {
  console.log(`删除，id: ${row.id}`)
}
const handleStatusChange = (row: MockEnvConfigEntity) => {
  console.log(`点击：启用/禁用按钮, env: ${row.env}, enabled: ${row.enabled}`)
  console.log(`envList.value[0], env: ${pageResult.list[0].env}, enabled: ${pageResult.list[0].enabled}`)
}
// 翻页：pageNo
const currentChangeHandler = async () => {
  console.log(`currentChangeHandler, pageNo: ${pageParam.pageNo}, pageSize: ${pageParam.pageSize}`)
}
// 每页条数：pageSize
const sizeChangeHandle = async () => {
  console.log(`sizeChangeHandle, pageNo: ${pageParam.pageNo}, pageSize: ${pageParam.pageSize}`)
}
</script>

<script lang="ts">
export default {
  name: 'MockEnv'
}
</script>

<style scoped lang="scss">
  .card {
    .table {
      margin-top: 10px;
    }
  }
</style>