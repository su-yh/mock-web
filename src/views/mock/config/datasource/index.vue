<template>
  <el-card><h1>Hi: Mock Config DataSource</h1></el-card>
  <el-card class="main-card">
    <el-button type="primary">新建</el-button>
    <el-table class="table" border :data="pageResult.list" show-overflow-tooltip>
      <el-table-column align="center" label="序号" type="index" width="80px"/>
      <el-table-column align="center" label="env" prop="env" width="200px"/>
      <el-table-column align="center" label="dataSourceName" prop="dataSourceName" width="200px"/>
      <el-table-column align="center" label="jdbcUrl" prop="jdbcUrl"/>
      <el-table-column align="center" label="username" prop="username"/>
      <el-table-column align="center" label="password" prop="password"/>
      <el-table-column align="center" label="driverClassName" prop="driverClassName"/>
      <el-table-column align="center" label="flywayEnabled" prop="flywayEnabled" width="180px">
        <template #default="scope">
          <el-switch v-model="scope.row.flywayEnabled" @change="handleFlywayEnabled(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="created" prop="created" width="180px"/>
      <el-table-column align="center" label="updated" prop="updated" width="180px"/>
      <el-table-column align="center" label="操作" width="200px">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editDataSource(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteDataSource(scope.row)">
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
        @current-change="currentChangeHandle"
        @size-change="sizeChangeHandle"
    />
  </el-card>

  <!-- 抽屉 -->
  <el-drawer v-model="drawerEnable">
    <!-- 抽屉：标题 -->
    <template #header>
      {{ drawerTitle }}
    </template>

    <!-- 抽屉：正文 -->
    <template #default>

    </template>

    <!-- 抽屉：页脚 -->
    <template #footer>
      <el-button @click="drawerCancel">取消</el-button>
      <el-button type="primary" @click="drawerSave">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {PageParams, PageResult, ResponseBase} from "@/api/base/types";
import {DataSourceEnums, EnvDatasourcePropertiesEntity} from '@/api/mock/config/datasource/types'
import {listPageReq, createReq, updateReq, deleteReq, flywaySwitchReq} from '@/api/mock/config/datasource'
import {ElMessage} from "element-plus";
import {Delete, Edit} from "@element-plus/icons-vue";

let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10})
let pageResult = reactive<PageResult<EnvDatasourcePropertiesEntity>>({total: 0, list: []})
// 抽屉
let drawerEnable = ref<boolean>(false)
let drawerTitle = ref<string>('')
let drawerEntity = ref<EnvDatasourcePropertiesEntity>({})


onMounted(async () => {
  await pageList();
})

const pageList = async () => {
  const result: ResponseBase<PageResult<EnvDatasourcePropertiesEntity>> = await listPageReq(pageParam);
  if (result.code != 0) {
    ElMessage({type: "error", message: result.message,})
    return
  }
  const data = result.data
  pageResult.list = data.list;
  pageResult.total = data.total
}

// 翻页：pageNo
const currentChangeHandle = async () => {
  await pageList();
}
// 每页条数：pageSize
const sizeChangeHandle = async () => {
  await pageList();
}

const drawerCancel = () => {
  drawerEnable.value = false  // 关闭抽屉
}
const drawerSave = async () => {
  const result: ResponseBase = drawerEntity.value.id
      ? await updateReq(drawerEntity.value)
      : await createReq(drawerEntity.value)
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  await pageList();
  drawerEnable.value = false  // 关闭抽屉
}

const editDataSource = (entity: EnvDatasourcePropertiesEntity) => {
  // TODO: suyh - 待实现
  drawerEnable.value = true
}

const deleteDataSource = async (entity: EnvDatasourcePropertiesEntity) => {
  const result: ResponseBase = await deleteReq(entity.id as string);
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  await pageList()
}

const handleFlywayEnabled = async (entity: EnvDatasourcePropertiesEntity) => {
  const result: ResponseBase = await flywaySwitchReq(entity.id as string, entity.flywayEnabled as boolean);
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  await pageList()
}
</script>

<style scoped>
.main-card {
  margin: 10px 0;

  .table {
    margin: 10px 0;
  }
}
</style>
