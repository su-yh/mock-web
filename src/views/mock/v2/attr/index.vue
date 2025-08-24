<template>
  <el-card>
    <h1>Hi: Mock Config Attr</h1>
  </el-card>

  <el-card class="envCard">
    <div class="envSelect">
      <span>环境： </span>
      <el-select style="width: 200px" v-model="envEntity" placeholder="请选择" size="large">
        <template #label>
          <span v-if="envEntity.env">{{envEntity.env}}(<span :style="{ color: envEntity.enabled ? 'blue' : 'red' }">{{envEntity.enabled ? '启用' : '禁用'}}</span>)</span>
        </template>
        <el-option v-for="envItem in envList" :key="envItem.id" :value="envItem">
          <span>{{ envItem.env }}(<span :style="{ color: envItem.enabled ? 'blue' : 'red' }">{{envItem.enabled ? '启用' : '禁用'}}</span>)</span>
        </el-option>
      </el-select>
    </div>
  </el-card>

  <!-- 只有选定了某个环境才会出现配置标签页 -->
  <el-card v-if="envEntity.env">
    <el-tabs v-if="envEntity.env" style="margin: 10px 0" type="border-card">
      <el-tab-pane label="MockConfigPlatform">
        <div style="margin: 10px 0"><span>{{envEntity.env}} 环境平台相关的属性配置： </span></div>
        <el-card shadow="always">
          <el-form label-width="160px">
            <el-form-item label="mode: ">
              <el-select v-model="platformEntity.mode" placeholder="请选择mode">
                <el-option :value="MockModeEnums.NONE" label="NONE" />
                <el-option :value="MockModeEnums.TIMER_JOB" label="TIMER_JOB" />
                <el-option :value="MockModeEnums.DATE_RANGE" label="DATE_RANGE" />
                <el-option :value="MockModeEnums.TS_RANGE" label="TS_RANGE" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker v-model="platformEntity.tsBegin" type="datetime" placeholder="开始时间" :default-time="['00:00:00']" value-format="x"/>
            </el-form-item>
            <el-form-item label="结束时间(不包含)：">
              <el-date-picker v-model="platformEntity.tsEnd" type="datetime" placeholder="结束时间" :default-time="['00:00:00']" value-format="x"/>
            </el-form-item>
            <el-form-item label="子渠道数量">
              <el-input-number v-model="platformEntity.subChannelCount" placeholder="子渠道数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大注册数量">
              <el-input-number v-model="platformEntity.randomMaxRegistry" placeholder="每次最大注册数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大登录数量">
              <el-input-number v-model="platformEntity.randomMaxLogin" placeholder="每次最大登录数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大充值数量">
              <el-input-number v-model="platformEntity.randomMaxRecharge" placeholder="每次最大充值数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大提现数量">
              <el-input-number v-model="platformEntity.randomMaxWithdrawal" placeholder="每次最大提现数量" :controls="false"/>
            </el-form-item>
            <el-button type="primary" size="large">保存</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="MockConfigDataSource">
        <!-- TODO: suyh - 这里配置数据源 -->
        这里配置数据源
      </el-tab-pane>
      <el-tab-pane label="MockConfigRabbitMq">
        <!-- TODO: suyh - 这里配置RabbitMQ -->
        这里配置RabbitMQ
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {MockEnvConfigEntity} from "@/api/mock/config/env/types";
import {listAllReq} from "@/api/mock/config/env";
import {ResponseBase} from "@/api/base/types";
import {ElMessage} from "element-plus";
import {MockModeEnums, MockPropertiesEntity} from "@/api/mock/config/platform/types";

// 所有的env 环境列表数据
const envList = ref<MockEnvConfigEntity[]>([])
// 选中的env 环境数据
const envEntity = ref<MockEnvConfigEntity>({env: '', enabled: false})
let platformEntity = ref<MockPropertiesEntity>({});

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
  }
}

</style>
