
<!--<template>-->
<!--  <el-card style="margin-bottom: 10px">-->
<!--    <h1>Hi: Mock Config Env</h1>-->
<!--  </el-card>-->
<!--  <el-card class="card">-->
<!--    <div class="btns">-->
<!--      <el-button class="btn_create" type="primary" @click="createEnv">添加环境</el-button>-->
<!--      <el-button type="primary" @click="pageList">搜索</el-button>-->
<!--    </div>-->
<!--    <el-table class="table" border :data="pageResult.list">-->
<!--      <el-table-column align="center" label="序号" type="index" width="80px" fixed="left"/>-->
<!--      <el-table-column align="center" label="env" prop="env" width="100px" fixed="left"/>-->
<!--      <el-table-column align="center" label="描述" prop="description" />-->
<!--      <el-table-column align="center" label="启用/禁用" prop="enabled" width="140px">-->
<!--        <template #default="scope">-->
<!--          <el-switch-->
<!--              v-model="scope.row.enabled"-->
<!--              @change="handleStatusChange(scope.row)"-->
<!--            />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column align="center" label="创建时间" prop="created" width="180px"/>-->
<!--      <el-table-column align="center" label="修改时间" prop="updated" width="180px"/>-->
<!--      <el-table-column align="center" label="操作" width="280px" fixed="right">-->
<!--        <template #default="scope">-->
<!--          <el-button type="primary" size="small" :icon="Edit" @click="editEnv(scope.row)">编辑</el-button>-->
<!--          <el-popconfirm title="确定要删除这条记录吗？" @confirm="deleteEnv(scope.row)">-->
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

<!--  &lt;!&ndash; 抽屉：侧边栏 &ndash;&gt;-->
<!--  <el-drawer v-model="drawerEnable">-->
<!--    &lt;!&ndash; 抽屉：标题 &ndash;&gt;-->
<!--    <template #header>-->
<!--      {{ drawerTitle }}-->
<!--    </template>-->
<!--    &lt;!&ndash; 抽屉：正文 &ndash;&gt;-->
<!--    <template #default>-->
<!--      <el-form label-width="120px">-->
<!--        <el-form-item label="env: ">-->
<!--          <template #default>-->
<!--            <el-input v-model="drawerEntity.env" placeholder="请输入env"></el-input>-->
<!--          </template>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="描述：">-->
<!--          <template #default>-->
<!--            <el-input v-model="drawerEntity.description" placeholder="请输入描述"></el-input>-->
<!--          </template>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="启用/禁用：">-->
<!--          <template #default>-->
<!--            <el-switch v-model="drawerEntity.enabled"/>-->
<!--          </template>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </template>-->
<!--    &lt;!&ndash; 抽屉：页脚 &ndash;&gt;-->
<!--    <template #footer>-->
<!--      <div>-->
<!--        <el-button @click="drawerCancel">取消</el-button>-->
<!--        <el-button type="primary" @click="drawerSave">保存</el-button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-drawer>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {ref, reactive, onMounted} from 'vue'-->
<!--import {MockEnvConfigEntity} from "@/api/mock/config/env/types";-->
<!--import {Delete, Edit} from "@element-plus/icons-vue";-->
<!--import {PageParams, PageResult, ResponseBase} from "@/api/base/types";-->
<!--import {listPageReq, createReq, updateReq, deleteReq, statusSwitchReq} from '@/api/mock/config/env';-->
<!--import {ElMessage} from "element-plus";-->

<!--let pageParam = reactive<PageParams>({pageNo: 1, pageSize: 10});-->
<!--let pageResult = reactive<PageResult<MockEnvConfigEntity>>({total: 0, list: []});-->
<!--// 显示/隐藏抽屉-->
<!--let drawerEnable = ref<boolean>(false);-->
<!--let drawerTitle = ref<string>('创建/编辑环境信息');-->
<!--let drawerEntity = ref<MockEnvConfigEntity>({env: '', enabled: true});-->

<!--onMounted(async () => {-->
<!--  await pageList();-->
<!--})-->

<!--const pageList = async () => {-->
<!--  const responseBase: ResponseBase<PageResult<MockEnvConfigEntity>> = await listPageReq(pageParam);-->
<!--  if (responseBase.code != 0) {-->
<!--    ElMessage({-->
<!--      type: "error",-->
<!--      message: responseBase.message,-->
<!--    })-->
<!--    return-->
<!--  }-->
<!--  const data = responseBase.data-->
<!--  pageResult.list = data.list;-->
<!--  pageResult.total = data.total-->
<!--}-->

<!--const resetDrawerEntity = () => {-->
<!--  drawerEntity.value = {env: '', enabled: true};-->
<!--}-->
<!--const createEnv = () => {-->
<!--  resetDrawerEntity();-->
<!--  drawerTitle.value = '创建环境'-->
<!--  drawerEnable.value = true;-->
<!--}-->
<!--const editEnv = (entity: MockEnvConfigEntity) => {-->
<!--  drawerTitle.value = '编辑环境'-->
<!--  drawerEntity.value = {...entity}-->
<!--  drawerEnable.value = true;-->
<!--}-->
<!--const deleteEnv = async (entity: MockEnvConfigEntity) => {-->
<!--  await deleteReq(entity.id as string);-->
<!--}-->
<!--const handleStatusChange = async (entity: MockEnvConfigEntity) => {-->
<!--  const result = await statusSwitchReq(entity.id as string, entity.enabled);-->
<!--  if (result.code != 0) {-->
<!--    ElMessage({-->
<!--      type: 'error',-->
<!--      message: result.message-->
<!--    })-->
<!--  }-->
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

<!--// 抽屉：取消按钮-->
<!--const drawerCancel = async () => {-->
<!--  drawerEnable.value = false  // 关闭抽屉-->
<!--}-->
<!--// 抽屉：保存按钮-->
<!--const drawerSave = async () => {-->
<!--  const resultSave: ResponseBase = drawerEntity.value.id-->
<!--      ? await updateReq(drawerEntity.value)-->
<!--      : await createReq(drawerEntity.value);-->
<!--  if (resultSave.code != 0) {-->
<!--    ElMessage({-->
<!--      type: 'error',-->
<!--      message: resultSave.message,-->
<!--    })-->
<!--    return-->
<!--  }-->

<!--  await pageList();-->
<!--  drawerEnable.value = false  // 关闭抽屉-->
<!--}-->
<!--</script>-->

<!--<script lang="ts">-->
<!--export default {-->
<!--  name: 'MockEnv'-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--  .card {-->
<!--    .btns {-->
<!--      display: flex;-->
<!--      justify-content: space-between;-->
<!--    }-->
<!--    .table {-->
<!--      margin-top: 10px;-->
<!--    }-->
<!--  }-->
<!--</style>-->