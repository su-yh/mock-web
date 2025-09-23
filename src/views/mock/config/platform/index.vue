<!--<template>-->
<!--  <el-card style="margin-bottom: 10px">Hi: Platform Config</el-card>-->
<!--  <el-card>-->
<!--    <el-button type="primary" @click="createEntity">新建</el-button>-->
<!--    <el-table class="table" border :data="pageResult.list">-->
<!--      <el-table-column align="center" label="序号" type="index" width="80px" fixed="left"/>-->
<!--      <el-table-column align="center" label="env" prop="env" width="100px" fixed="left"/>-->
<!--      <el-table-column align="center" label="mode" prop="mode" :formatter="formatMode"/>-->
<!--      <el-table-column align="center" label="开始时间" prop="tsBegin" :formatter="formatTimestamp"/>-->
<!--      <el-table-column align="center" label="结束时间" prop="tsEnd" :formatter="formatTimestamp"/>-->
<!--      <el-table-column align="center" label="子渠道数量" prop="subChannelCount"/>-->
<!--      <el-table-column align="center" label="每次最大注册数量" prop="randomMaxRegistry" width="120px"/>-->
<!--      <el-table-column align="center" label="每次最大登录数量" prop="randomMaxLogin" width="120px"/>-->
<!--      <el-table-column align="center" label="每次最大充值数量" prop="randomMaxRecharge" width="120px"/>-->
<!--      <el-table-column align="center" label="每次最大提现数量" prop="randomMaxWithdrawal" width="120px"/>-->
<!--      <el-table-column align="center" label="创建时间" prop="created" width="180px"/>-->
<!--      <el-table-column align="center" label="修改时间" prop="updated" width="180px"/>-->
<!--      <el-table-column align="center" label="操作" width="200px" fixed="right">-->
<!--        <template #default="scope">-->
<!--          <el-button type="primary" size="small" :icon="Edit" @click="editEntity(scope.row)">编辑</el-button>-->
<!--          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteItem(scope.row)">-->
<!--            <template #reference>-->
<!--              <el-button type="danger" size="small" :icon="Delete">删除</el-button>-->
<!--            </template>-->
<!--          </el-popconfirm>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <el-pagination-->
<!--        v-model:current-page="pageParam.pageNo"-->
<!--        v-model:page-size="pageParam.pageSize"-->
<!--        :page-sizes="[1, 5, 10, 20, 50, 100]"-->
<!--        :size="'default'"-->
<!--        :background="true"-->
<!--        layout="prev, pager, next, jumper, ->, total, sizes"-->
<!--        :total="pageResult.total"-->
<!--        @current-change="currentChangeHandle"-->
<!--        @size-change="sizeChangeHandle"-->
<!--    />-->
<!--  </el-card>-->
<!--  <el-drawer v-model="drawerEnable">-->
<!--    &lt;!&ndash; 抽屉：标题 &ndash;&gt;-->
<!--    <template #header>-->
<!--      {{ drawerTitle }}-->
<!--    </template>-->

<!--    &lt;!&ndash; 抽屉：正文 &ndash;&gt;-->
<!--    <template #default>-->
<!--      <el-form label-width="160px">-->
<!--        <el-form-item label="env: ">-->
<!--          <el-select-->
<!--              v-model="drawerEntity.env"-->
<!--              placeholder="请选择env"-->
<!--              clearable-->
<!--              :disabled="envList.length === 0"-->
<!--          >-->
<!--            <el-option-->
<!--                v-for="envItem in envList"-->
<!--                :key="envItem.id"-->
<!--                :label="envItem.env"-->
<!--                :value="envItem.env"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="mode: ">-->
<!--          <el-select v-model="drawerEntity.mode" placeholder="请选择mode">-->
<!--            <el-option :value="MockModeEnums.NONE" label="NONE" />-->
<!--            <el-option :value="MockModeEnums.TIMER_JOB" label="TIMER_JOB" />-->
<!--            <el-option :value="MockModeEnums.DATE_RANGE" label="DATE_RANGE" />-->
<!--            <el-option :value="MockModeEnums.TS_RANGE" label="TS_RANGE" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开始时间：">-->
<!--          <el-date-picker v-model="drawerEntity.tsBegin" type="datetime" placeholder="开始时间" :default-time="['00:00:00']" value-format="x"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="结束时间(不包含)：">-->
<!--          <el-date-picker v-model="drawerEntity.tsEnd" type="datetime" placeholder="结束时间" :default-time="['00:00:00']" value-format="x"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="子渠道数量">-->
<!--          <el-input-number v-model="drawerEntity.subChannelCount" placeholder="子渠道数量" :controls="false"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="每次最大注册数量">-->
<!--          <el-input-number v-model="drawerEntity.randomMaxRegistry" placeholder="每次最大注册数量" :controls="false"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="每次最大登录数量">-->
<!--          <el-input-number v-model="drawerEntity.randomMaxLogin" placeholder="每次最大登录数量" :controls="false"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="每次最大充值数量">-->
<!--          <el-input-number v-model="drawerEntity.randomMaxRecharge" placeholder="每次最大充值数量" :controls="false"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="每次最大提现数量">-->
<!--          <el-input-number v-model="drawerEntity.randomMaxWithdrawal" placeholder="每次最大提现数量" :controls="false"/>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </template>-->

<!--    &lt;!&ndash; 抽屉：页脚 &ndash;&gt;-->
<!--    <template #footer>-->
<!--      <el-button @click="drawerCancel">取消</el-button>-->
<!--      <el-button type="primary" @click="drawerSave">保存</el-button>-->
<!--    </template>-->
<!--  </el-drawer>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {onMounted, reactive, ref} from "vue";-->
<!--import {PageParams, PageResult, ResponseBase} from "@/api/base/types";-->
<!--import {MockModeEnums, MockPropertiesEntity} from "@/api/mock/config/platform/types";-->
<!--import {Delete, Edit} from "@element-plus/icons-vue";-->
<!--import {listPageReq, createReq, updateReq, deleteReq} from "@/api/mock/config/platform";-->
<!--import {MockEnvConfigEntity} from '@/api/mock/config/env/types'-->
<!--import {listAllReq as envListAllReq} from '@/api/mock/config/env/index'-->
<!--import {ElMessage, TableColumnCtx} from "element-plus";-->

<!--// 分页相关的属性-->
<!--let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10})-->
<!--let pageResult = reactive<PageResult<MockPropertiesEntity>>({total: 0, list: []});-->
<!--// 抽屉相关的属性-->
<!--let drawerEnable = ref<boolean>(false);-->
<!--let drawerTitle = ref<string>('');-->
<!--let drawerEntity = ref<MockPropertiesEntity>({});-->
<!--// env下拉列表数据-->
<!--const envList = ref<MockEnvConfigEntity[]>([]);-->

<!--const deleteItem = async (entity: MockPropertiesEntity) => {-->
<!--  console.log("删除: ", entity.id)-->
<!--  const result: ResponseBase = await deleteReq(entity.id as string);-->
<!--  if (result.code != 0) {-->
<!--    ElMessage({type: 'error', message: result.message})-->
<!--    return-->
<!--  }-->

<!--  await pageList()-->
<!--}-->

<!--onMounted(async () => {-->
<!--  await pageList();-->
<!--})-->

<!--const pageList = async () => {-->
<!--  const result: ResponseBase = await listPageReq(pageParam);-->
<!--  if (result.code != 0) {-->
<!--    ElMessage({-->
<!--      type: 'error',-->
<!--      message: result.message-->
<!--    })-->
<!--    return-->
<!--  }-->

<!--  const data = result.data;-->

<!--  pageResult.total = data.total;-->
<!--  pageResult.list = data.list;-->
<!--}-->

<!--// 【新增】加载env下拉列表数据的通用函数-->
<!--const loadEnvList = async () => {-->
<!--  const result: ResponseBase<MockEnvConfigEntity[]> = await envListAllReq();-->
<!--  if (result.code != 0) {-->
<!--    envList.value = [];-->
<!--    ElMessage({-->
<!--      type: 'error',-->
<!--      message: result.message-->
<!--    });-->
<!--    return-->
<!--  }-->

<!--  envList.value = result.data;-->
<!--}-->

<!--const formatMode = (row: MockPropertiesEntity, column: TableColumnCtx<MockPropertiesEntity>, mode: MockModeEnums) => {-->
<!--  return formatModeItem(mode)-->
<!--}-->

<!--const formatModeItem = (mode?: MockModeEnums) => {-->
<!--  if (mode === undefined) {-->
<!--    return 'undefined'-->
<!--  }-->

<!--  let fmt: string = '-';-->
<!--  switch (mode) {-->
<!--    case MockModeEnums.TIMER_JOB:-->
<!--      fmt = 'TIME_JOB';-->
<!--      break-->
<!--    case MockModeEnums.DATE_RANGE:-->
<!--      fmt = 'DATE_RANGE';-->
<!--      break-->
<!--    case MockModeEnums.TS_RANGE:-->
<!--      fmt = 'TS_RANGE';-->
<!--      break-->
<!--    case MockModeEnums.NONE:-->
<!--      fmt = 'NONE';-->
<!--      break-->
<!--    default:-->
<!--      break-->
<!--  }-->
<!--  return fmt-->
<!--}-->

<!--// 时间戳格式化函数（毫秒 -> 字符串）-->
<!--const formatTimestamp = (row: MockPropertiesEntity, column: TableColumnCtx<MockPropertiesEntity>, ts: number) => {-->
<!--  if (!ts) {-->
<!--    return '&#45;&#45;';-->
<!--  }-->

<!--  const date = new Date(ts);-->
<!--  // 格式化为 yyyy-MM-dd HH:mm:ss 格式-->
<!--  const year = date.getFullYear();-->
<!--  const month = String(date.getMonth() + 1).padStart(2, '0');-->
<!--  const day = String(date.getDate()).padStart(2, '0');-->
<!--  const hours = String(date.getHours()).padStart(2, '0');-->
<!--  const minutes = String(date.getMinutes()).padStart(2, '0');-->
<!--  const seconds = String(date.getSeconds()).padStart(2, '0');-->

<!--  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;-->
<!--};-->

<!--const createEntity = async () => {-->
<!--  await loadEnvList();-->
<!--  drawerEntity.value = {mode: MockModeEnums.NONE, tsBegin: 1, tsEnd: 1}-->
<!--  drawerTitle.value = '新建'-->
<!--  drawerEnable.value = true-->
<!--}-->

<!--const editEntity = async (editEntity: MockPropertiesEntity) => {-->
<!--  await loadEnvList();-->
<!--  drawerEntity.value = {...editEntity}-->
<!--  drawerTitle.value = '编辑'-->
<!--  drawerEnable.value = true-->
<!--}-->

<!--const drawerCancel = () => {-->
<!--  drawerEnable.value = false-->
<!--}-->

<!--const drawerSave = async () => {-->
<!--  const result: ResponseBase = drawerEntity.value.id-->
<!--      ? await updateReq(drawerEntity.value)-->
<!--      : await createReq(drawerEntity.value);-->
<!--  if (result.code != 0) {-->
<!--    ElMessage({type: 'error', message: result.message})-->
<!--    return-->
<!--  }-->

<!--  drawerEnable.value = false-->
<!--  await pageList();-->
<!--}-->

<!--// 翻页：pageNo-->
<!--const currentChangeHandle = async () => {-->
<!--  await pageList();-->
<!--}-->
<!--// 每页条数：pageSize-->
<!--const sizeChangeHandle = async () => {-->
<!--  await pageList();-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.table {-->
<!--  margin: 10px 0;-->
<!--}-->
<!--</style>-->