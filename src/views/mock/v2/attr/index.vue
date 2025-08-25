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

      <!-- 平台属性配置 -->
      <el-tab-pane :label="TabNameEnum.Platform" :name="TabNameEnum.Platform">
        <el-card shadow="always">
          <el-form label-width="160px">
            <el-form-item label="mode: ">
              <el-select style="width: 200px" v-model="tabData.platformEntity.mode" clearable placeholder="请选择mode">
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

            <!-- TODO: suyh - 保存，更新或者创建 -->
            <el-button type="primary" size="large">保存</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>

      <!-- 数据源配置 -->
      <el-tab-pane :label="TabNameEnum.DataSource" :name="TabNameEnum.DataSource">
        <!-- 数据源：flinkCds -->
        <el-card>
          <el-form label-width="120px">
            <el-form-item label="dataSourceName: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkCds.dataSourceName" disabled/>
              </template>
            </el-form-item>
            <el-form-item label="jdbcUrl: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkCds.jdbcUrl" placeholder="请输入jdbcUrl"/>
              </template>
            </el-form-item>
            <el-form-item label="username: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkCds.username" placeholder="请输入username"/>
              </template>
            </el-form-item>
            <el-form-item label="password: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkCds.password" placeholder="请输入password"/>
              </template>
            </el-form-item>
            <el-form-item label="driverClassName: ">
              <template #default>
                <el-select v-model="tabData.dataSources.flinkCds.driverClassName">
                  <el-option :value="'com.mysql.cj.jdbc.Driver'" :label="'mysql(com.mysql.cj.jdbc.Driver)'"/>
                  <el-option :value="'org.postgresql.Driver'" :label="'pgsql(org.postgresql.Driver)'"/>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="flywayEnabled: ">
              <template #default>
                <el-switch v-model="tabData.dataSources.flinkCds.flywayEnabled"/>
              </template>
            </el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form>
        </el-card>

        <!-- 数据源：flinkPgCdap -->
        <el-card style="margin-top: 10px">
          <el-form label-width="120px">
            <el-form-item label="dataSourceName: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkPgCdap.dataSourceName" disabled/>
              </template>
            </el-form-item>
            <el-form-item label="jdbcUrl: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkPgCdap.jdbcUrl" placeholder="请输入jdbcUrl"/>
              </template>
            </el-form-item>
            <el-form-item label="username: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkPgCdap.username" placeholder="请输入username"/>
              </template>
            </el-form-item>
            <el-form-item label="password: ">
              <template #default>
                <el-input v-model="tabData.dataSources.flinkPgCdap.password" placeholder="请输入password"/>
              </template>
            </el-form-item>
            <el-form-item label="driverClassName: ">
              <template #default>
                <el-select v-model="tabData.dataSources.flinkPgCdap.driverClassName">
                  <el-option :value="'com.mysql.cj.jdbc.Driver'" :label="'mysql(com.mysql.cj.jdbc.Driver)'"/>
                  <el-option :value="'org.postgresql.Driver'" :label="'pgsql(org.postgresql.Driver)'"/>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="flywayEnabled: ">
              <template #default>
                <el-switch v-model="tabData.dataSources.flinkPgCdap.flywayEnabled"/>
              </template>
            </el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="TabNameEnum.RabbitMq" :name="TabNameEnum.RabbitMq">
        <span>生成的mock 数据写到rabbitmq 中的相关配置</span>
        <!-- RabbitMQ -->
        <el-card style="margin-top: 10px">
          <el-form label-width="160px">
            <el-form-item label="env: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.env" disabled/>
              </template>
            </el-form-item>
            <el-form-item label="enabled: ">
              <template #default>
                <el-switch v-model="tabData.rabbitMqEntity.enabled" @change="switchRabbitMqStatus"/>
              </template>
            </el-form-item>
            <el-form-item label="host: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.host" placeholder="请输入host"/>
              </template>
            </el-form-item>
            <el-form-item label="port: ">
              <template #default>
                <el-input-number v-model="tabData.rabbitMqEntity.port" :controls="false" placeholder="请输入port"/>
              </template>
            </el-form-item>
            <el-form-item label="username: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.username" placeholder="请输入username"/>
              </template>
            </el-form-item>
            <el-form-item label="password: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.password" placeholder="请输入password"/>
              </template>
            </el-form-item>
            <el-form-item label="virtualHost: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.virtualHost" placeholder="请输入virtualHost"/>
              </template>
            </el-form-item>
            <el-form-item label="exchange: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.exchange" placeholder="请输入exchange"/>
              </template>
            </el-form-item>
            <el-form-item label="routingKeyRegistry: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.routingKeyRegistry" placeholder="请输入routingKeyRegistry"/>
              </template>
            </el-form-item>
            <el-form-item label="routingKeyLogin: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.routingKeyLogin" placeholder="请输入routingKeyLogin"/>
              </template>
            </el-form-item>
            <el-form-item label="routingKeyRecharge: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.routingKeyRecharge" placeholder="请输入routingKeyRecharge"/>
              </template>
            </el-form-item>
            <el-form-item label="routingKeyWithdrawal: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.routingKeyWithdrawal" placeholder="请输入routingKeyWithdrawal"/>
              </template>
            </el-form-item>
            <el-form-item label="created: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.created" disabled/>
              </template>
            </el-form-item>
            <el-form-item label="updated: ">
              <template #default>
                <el-input v-model="tabData.rabbitMqEntity.updated" disabled/>
              </template>
            </el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form>
        </el-card>
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
import {queryPlatformByEnvReq} from "@/api/mock/config/platform";
import {queryDataSourceByEnvReq} from '@/api/mock/config/datasource'
import {DataSourceEnums, EnvDatasourcePropertiesEntity} from "@/api/mock/config/datasource/types";
import {EnvRabbitmqPropertiesEntity} from "@/api/mock/config/rabbitmq/types";
import {queryRabbitMqEntityByEnv, switchRabbitMqEnableDisable} from "@/api/mock/config/rabbitmq";

enum TabNameEnum {
  Platform = 'MockConfigPlatform',
  DataSource = 'MockConfigDataSource',
  RabbitMq = 'MockConfigRabbitMq'
}

interface TabData {
  activeTabName: TabNameEnum, // 当前选中的标签页
  platformEntity: MockPropertiesEntity,  // platform 标签数据
  // datasource 标签数据
  dataSources: {
    flinkCds: EnvDatasourcePropertiesEntity,
    flinkPgCdap: EnvDatasourcePropertiesEntity
  },
  rabbitMqEntity: EnvRabbitmqPropertiesEntity,  // rabbitmq 标签数据
}

// 所有的env 环境列表数据
const envList = ref<MockEnvConfigEntity[]>([])
// 选中的env 环境数据
const envEntity = ref<MockEnvConfigEntity>({env: '', enabled: false})
// tabs 标签页相关的数据属性对象
let tabData = reactive<TabData>({
  activeTabName: TabNameEnum.Platform,
  platformEntity: {},
  dataSources: {
    flinkCds: {},
    flinkPgCdap: {},
  },
  rabbitMqEntity: {env: envEntity.value.env}
})

onMounted(async () => {
  const result: ResponseBase<MockEnvConfigEntity[]> = await listAllReq();
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  envList.value = result.data
})

const handleTabChange = async (tabName: TabNameEnum = tabData.activeTabName) => {
  switch (tabName) {
    case TabNameEnum.Platform:  // 环境平台属性相关处理
    {
      const result: ResponseBase<MockPropertiesEntity> = await queryPlatformByEnvReq(envEntity.value.env);
      if (result.code != 0) {
        ElMessage({type: 'error', message: result.message})
        return
      }
      tabData.platformEntity = result.data ? result.data : {}
    }
      break

    case TabNameEnum.DataSource:  // 数据源的相关处理
    {
      const result: ResponseBase<EnvDatasourcePropertiesEntity> = await queryDataSourceByEnvReq(envEntity.value.env, DataSourceEnums.FLINK_CDS);
      if (result.code != 0) {
        ElMessage({type: 'error', message: result.message})
        return
      }
      tabData.dataSources.flinkCds = result.data ? result.data : {dataSourceName: DataSourceEnums.FLINK_CDS}
    }
    {
      const result: ResponseBase<EnvDatasourcePropertiesEntity> = await queryDataSourceByEnvReq(envEntity.value.env, DataSourceEnums.FLINK_PG_CDAP);
      if (result.code != 0) {
        ElMessage({type: 'error', message: result.message})
        return
      }
      tabData.dataSources.flinkPgCdap = result.data ? result.data : {dataSourceName: DataSourceEnums.FLINK_PG_CDAP}
    }
      break

    case TabNameEnum.RabbitMq:  // rabbitmq 配置属性相关处理
    {
      const result: ResponseBase<EnvRabbitmqPropertiesEntity> = await queryRabbitMqEntityByEnv(envEntity.value.env)
      if (result.code != 0) {
        ElMessage({type: 'error', message: result.message})
        return
      }
      tabData.rabbitMqEntity = result.data ? result.data : {}
    }
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

const switchRabbitMqStatus = async () => {
  if (!tabData.rabbitMqEntity.id) {
    return
  }

  const result: ResponseBase = await switchRabbitMqEnableDisable(tabData.rabbitMqEntity.id, tabData.rabbitMqEntity.enabled as boolean);
  if (result.code != 0) {
    ElMessage({type: 'error', message: result.message})
    return
  }

  await handleTabChange();
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
