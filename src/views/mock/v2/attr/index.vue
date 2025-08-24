<template>
  <el-card>
    <h1>Hi: Mock Config Attr</h1>
  </el-card>

  <el-card class="envCard">
    <div class="envSelect">
      <span>环境： </span>
      <el-select style="width: 200px" v-model="envEntity" placeholder="请选择" size="large" @change="envChangeHandle">
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
    <el-tabs v-if="envEntity.env" style="margin: 10px 0" type="border-card" v-model="tabData.activeTabName" @tab-change="handleTabChange">
      <el-tab-pane :label="TabNameEnum.Platform" :name="TabNameEnum.Platform">
        <div style="margin: 10px 0"><span>{{envEntity.env}} 环境平台相关的属性配置： </span></div>
        <el-card shadow="always">
          <el-form label-width="160px">
            <el-form-item label="mode: ">
              <el-select v-model="tabData.platformEntity.mode" placeholder="请选择mode">
                <el-option :value="MockModeEnums.NONE" label="NONE" />
                <el-option :value="MockModeEnums.TIMER_JOB" label="TIMER_JOB" />
                <el-option :value="MockModeEnums.DATE_RANGE" label="DATE_RANGE" />
                <el-option :value="MockModeEnums.TS_RANGE" label="TS_RANGE" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker v-model="tabData.platformEntity.tsBegin" type="datetime" placeholder="开始时间" :default-time="['00:00:00']" value-format="x"/>
            </el-form-item>
            <el-form-item label="结束时间(不包含)：">
              <el-date-picker v-model="tabData.platformEntity.tsEnd" type="datetime" placeholder="结束时间" :default-time="['00:00:00']" value-format="x"/>
            </el-form-item>
            <el-form-item label="子渠道数量">
              <el-input-number v-model="tabData.platformEntity.subChannelCount" placeholder="子渠道数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大注册数量">
              <el-input-number v-model="tabData.platformEntity.randomMaxRegistry" placeholder="每次最大注册数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大登录数量">
              <el-input-number v-model="tabData.platformEntity.randomMaxLogin" placeholder="每次最大登录数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大充值数量">
              <el-input-number v-model="tabData.platformEntity.randomMaxRecharge" placeholder="每次最大充值数量" :controls="false"/>
            </el-form-item>
            <el-form-item label="每次最大提现数量">
              <el-input-number v-model="tabData.platformEntity.randomMaxWithdrawal" placeholder="每次最大提现数量" :controls="false"/>
            </el-form-item>
            <el-button type="primary" size="large">保存</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="TabNameEnum.DataSource" :name="TabNameEnum.DataSource">
        <!-- TODO: suyh - 这里配置数据源 -->
        这里配置数据源
      </el-tab-pane>
      <el-tab-pane :label="TabNameEnum.RabbitMq" :name="TabNameEnum.RabbitMq">
        <!-- TODO: suyh - 这里配置RabbitMQ -->
        这里配置RabbitMQ
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>


<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {MockEnvConfigEntity} from "@/api/mock/config/env/types";
import {listAllReq} from "@/api/mock/config/env";
import {ResponseBase} from "@/api/base/types";
import {ElMessage} from "element-plus";
import {MockModeEnums, MockPropertiesEntity} from "@/api/mock/config/platform/types";

enum TabNameEnum {
  Platform = 'MockConfigPlatform',
  DataSource = 'MockConfigDataSource',
  RabbitMq = 'MockConfigRabbitMq'
}

interface TabData {
  activeTabName: TabNameEnum, // 当前选中的标签页
  platformEntity?: MockPropertiesEntity,  // platform 标签数据
  dataSourceEntity?: any, // datasource 标签数据
  rabbitMqEntity?: any,  // rabbitmq 标签数据
}

// 所有的env 环境列表数据
const envList = ref<MockEnvConfigEntity[]>([])
// 选中的env 环境数据
const envEntity = ref<MockEnvConfigEntity>({env: '', enabled: false})
// tabs 标签页相关的数据属性对象
let tabData = reactive<TabData>({activeTabName: TabNameEnum.Platform})

onMounted(async () => {
  const result: ResponseBase<MockEnvConfigEntity[]> = await listAllReq();
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  envList.value = result.data
})

const handleTabChange = async (tabName: TabNameEnum) => {
  console.log("current table name: ", tabName)
  switch (tabName) {
    case TabNameEnum.Platform:
      // TODO: suyh - 初始化 platformEntity 的值，通过API 去请求数据
      console.log('处理平台配置逻辑')
      tabData.platformEntity = {}
      break
    case TabNameEnum.DataSource:
      console.log('处理数据源配置逻辑')
      break
    case TabNameEnum.RabbitMq:
      console.log('处理RabbitMQ配置逻辑')
      break
    default:
        break
  }
}

const envChangeHandle = async (envItem: MockEnvConfigEntity) => {
  // 这里的参数 envItem 可以直接使用 envEntity，这个v-model 绑定的对象在事情 发生时已经是变更 后的值，与envItem 是一样的效果。

  // 当前选中的env 环境，通过该环境去查询对应的配置数据项

  await handleTabChange(tabData.activeTabName);
}

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
