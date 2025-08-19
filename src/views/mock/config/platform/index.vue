<template>
  <el-card style="margin-bottom: 10px">Hi: Platform Config</el-card>
  <el-card>
    <el-button type="primary" @click="createEntity">新建</el-button>
    <el-table class="table" border :data="pageResult.list">
      <el-table-column align="center" label="序号" type="index" width="80px"/>
      <el-table-column align="center" label="env" prop="env"/>
      <el-table-column align="center" label="mode" prop="mode" :formatter="formatMode"/>
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
          <el-button type="primary" size="small" :icon="Edit" @click="editEntity(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteItem(scope.row)">
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
  <el-drawer v-model="drawerEnable">
    <!-- 抽屉：标题 -->
    <template #header>
      {{ drawerTitle }}
    </template>

    <!-- 抽屉：正文 -->
    <template #default>
      <el-form label-width="120px">
        <el-form-item label="env: ">
          <template #default>
            <el-input v-model="drawerEntity.env" placeholder="请输入env"/>
          </template>
        </el-form-item>
        <el-form-item label="mode: ">
          <el-select v-model="drawerEntity.mode" placeholder="请选择mode">
            <el-option :value="MockModeEnums.NONE" label="无" />
            <el-option :value="MockModeEnums.TIMER_JOB" label="定时任务" />
            <el-option :value="MockModeEnums.DATE_RANGE" label="日期范围" />
            <el-option :value="MockModeEnums.TS_RANGE" label="时间戳范围" />
          </el-select>
        </el-form-item>
      </el-form>
    </template>

    <!-- 抽屉：页脚 -->
    <template #footer>
      <el-button @click="drawerCancel">取消</el-button>
      <el-button type="primary" @click="drawerSave">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {PageParams, PageResult, ResponseBase} from "@/api/base/types";
import {MockModeEnums, MockPropertiesEntity} from "@/api/mock/config/platform/types";
import {Delete, Edit} from "@element-plus/icons-vue";
import {listPageReq, createReq, updateReq, deleteReq} from "@/api/mock/config/platform";
import {MockEnvConfigEntity} from '@/api/mock/config/env/types'
import {listAllReq as envListAllReq} from '@/api/mock/config/env/index'
import {ElMessage, TableColumnCtx} from "element-plus";

// 分页相关的属性
let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10})
let pageResult = reactive<PageResult<MockPropertiesEntity>>({total: 0, list: []});
// 抽屉相关的属性
let drawerEnable = ref<boolean>(false);
let drawerTitle = ref<string>('');
let drawerEntity = ref<MockPropertiesEntity>({});

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

const formatMode = (row: MockPropertiesEntity, column: TableColumnCtx<MockPropertiesEntity>, mode: MockModeEnums) => {
  return formatModeItem(mode)
}

const formatModeItem = (mode: MockModeEnums) => {
  if (!mode) {
    return '-';
  }

  let fmt: string = '-';
  switch (mode) {
    case MockModeEnums.TIMER_JOB:
      fmt = 'TIME_JOB';
      break
    case MockModeEnums.DATE_RANGE:
      fmt = 'DATE_RANGE';
      break
    case MockModeEnums.TS_RANGE:
      fmt = 'TS_RANGE';
      break
    default:
      break
  }
  return fmt
}

// 时间戳格式化函数（毫秒 -> 字符串）
const formatTimestamp = (row: MockPropertiesEntity, column: TableColumnCtx<MockPropertiesEntity>, ts: number) => {
  if (!ts) {
    return '--';
  }

  const date = new Date(ts);
  // 格式化为 yyyy-MM-dd HH:mm:ss 格式
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const createEntity = async () => {
  drawerEntity.value = {mode: MockModeEnums.NONE}
  drawerTitle.value = '新建'
  drawerEnable.value = true


  const result: ResponseBase<MockEnvConfigEntity[]> = await envListAllReq();
  console.log(`result.code: ${result.code}, result.message: ${result.message}, result.data: ${result.data}`)

  for (let i = 0; i < result.data.length; i++) {
    const entity: MockEnvConfigEntity = result.data[i];
    console.log(`i: ${i}, id: ${entity.id}, env: ${entity.env}`)
  }
}

const editEntity = (editEntity: MockPropertiesEntity) => {
  drawerEntity.value = {...editEntity}
  drawerTitle.value = '编辑'
  drawerEnable.value = true
}

const drawerCancel = () => {
  drawerEnable.value = false
}

const drawerSave = () => {
  drawerEnable.value = false
}

// 翻页：pageNo
const currentChangeHandle = async () => {
  await pageList();
}
// 每页条数：pageSize
const sizeChangeHandle = async () => {
  await pageList();
}
</script>

<style scoped>
.table {
  margin: 10px 0;
}
</style>
