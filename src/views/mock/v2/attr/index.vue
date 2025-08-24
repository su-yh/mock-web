<template>
  <el-card>
    <h1>Hi: Mock Config Attr</h1>
  </el-card>

  <el-card class="envCard">
    <div class="envSelect">
      <span>选择对应的环境： </span>
      <el-select v-model="envEntity.env" size="large">
        <el-option v-for="envItem in envList" :key="envItem.id" :label="`${envItem.env}(${envItem.enabled ? '启用' : '禁用'})`" :value="envItem.env">
          <span>{{ envItem.env }}(<span :style="{ color: envItem.enabled ? 'blue' : 'red' }">{{envItem.enabled ? '启用' : '禁用'}}</span>)</span>
        </el-option>
      </el-select>
    </div>
  </el-card>

  <el-card>
    <!-- 使用多标签页 -->
    <el-tabs>
      <el-tab-pane label="MockConfigPlatform">
        <span>{{envEntity.env}} 环境平台相关的属性配置： </span>
      </el-tab-pane>
      <el-tab-pane label="MockConfigDataSource">Config</el-tab-pane>
      <el-tab-pane label="MockConfigRabbitMq">Role</el-tab-pane>
    </el-tabs>
  </el-card>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {MockEnvConfigEntity} from "@/api/mock/config/env/types";
import {listAllReq} from "@/api/mock/config/env";
import {ResponseBase} from "@/api/base/types";
import {ElMessage} from "element-plus";

// 所有的env 环境列表数据
const envList = ref<MockEnvConfigEntity[]>([])
// 选中的env 环境数据
const envEntity = ref<MockEnvConfigEntity>({env: '', enabled: false})

onMounted(async () => {
  const result: ResponseBase<MockEnvConfigEntity[]> = await listAllReq();
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  envList.value = result.data
})

</script>


<style scoped lang="scss">
.envCard {
  margin: 10px 0;

  .envSelect {
    display: flex;
    align-items: center;

    span {
      width: 160px;
    }

  }
}

</style>