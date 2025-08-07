<template>
  <div class="converter-container">
    <div class="editor-container">
      <!-- 左侧YAML编辑器 -->
      <div class="editor-panel">
        <h3>
          YAML 编辑器
          <span class="status-indicator" :class="statusClass">
            {{ statusText }}
          </span>
        </h3>
        <MonacoEditor
            v-model:value="yamlContent"
            :options="editorOptions"
            height="calc(100% - 40px)"
            width="100%"
            @update:value="handleYamlChange"
        />
        <div class="editor-footer">
          <span>输入停止后 1 秒自动转换</span>
        </div>
      </div>

      <!-- 右侧JSON结果 -->
      <div class="result-panel">
        <h3>JSON 结果</h3>
        <div class="json-display">
          <!-- 仅显示转换成功的结果或错误信息 -->
          <pre v-if="jsonResult" class="valid">{{ jsonResult }}</pre>

          <!-- 友好的错误提示 -->
          <div v-if="errorMessage" class="error-container">
            <div class="error-header">
              <i class="icon-warning">⚠️</i>
              <span>转换失败</span>
            </div>
            <div class="error-details">
              <p>{{ friendlyErrorMsg }}</p>
              <p class="error-hint">提示：YAML 要求严格的缩进和语法，例如列表项需要用短横线开头</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button type="primary" size="default" @click="save">保存</el-button>
    <el-button>取消</el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'
import jsYaml from 'js-yaml'
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js'

// 状态管理
const yamlContent = ref(`\
# 请输入YAML内容
name: 示例
description: 这是一个YAML转JSON的工具
features:
  - 实时转换
  - 友好提示
  - 错误指引

base:
  datasource:
    hikari:
      master:
        jdbc-url: jdbc:mysql://qu-yun.isuyh.com:3306/study_vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai
        username: study_vue
        password: study_vue
        flyway:
          enabled: true
          locations:
            - "sqls/mysql/sys/base"
            - "sqls/zhenxuan/mysql"


`)
const jsonResult = ref('')
const rawErrorMessage = ref('')
let debounceTimer = null // 仅保留定时器，移除加载状态变量

// 编辑器配置
const editorOptions = {
  language: 'yaml',
  lineNumbers: 'on',
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  fontSize: 14,
  indentUnit: 2 // YAML推荐2空格缩进
}

// 处理YAML内容变化（带防抖）
const handleYamlChange = (value) => {
  // 清除之前的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // 1秒延迟后转换（不显示等待状态）
  debounceTimer = setTimeout(() => {
    convertYamlToJson(value)
  }, 1000)
}

// 转换逻辑
const convertYamlToJson = (yaml) => {
  try {
    // 解析YAML并转换为JSON
    const parsedData = jsYaml.load(yaml)
    jsonResult.value = JSON.stringify(parsedData, null, 2)
    rawErrorMessage.value = '' // 成功时清空错误信息
  } catch (error) {
    // 捕获错误
    rawErrorMessage.value = error.message
    jsonResult.value = '' // 失败时清空结果
  }
}

// 计算属性 - 友好的错误信息
const friendlyErrorMsg = computed(() => {
  if (!rawErrorMessage.value) return ''

  // 解析原始错误信息，提供更友好的提示
  if (rawErrorMessage.value.includes('bad indentation')) {
    return '缩进格式有误，请检查空格数量是否一致'
  } else if (rawErrorMessage.value.includes('duplicate key')) {
    return '存在重复的键名，请修改为唯一的键'
  } else if (rawErrorMessage.value.includes('end of the stream or a document separator')) {
    return '语法不完整，可能缺少闭合的结构或内容'
  } else if (rawErrorMessage.value.includes('unexpected token')) {
    return '存在意外的符号，请检查特殊字符的使用'
  } else {
    // 保留原始错误的关键部分，但去掉技术细节
    const simpleMsg = rawErrorMessage.value.split('\n')[0]
    return `格式错误: ${simpleMsg}`
  }
})

// 计算属性 - 状态文本和样式（简化状态）
const statusText = computed(() => {
  if (rawErrorMessage.value) return '转换失败'
  if (jsonResult.value) return '转换成功'
  return '准备就绪'
})

const statusClass = computed(() => {
  if (rawErrorMessage.value) return 'status-error'
  if (jsonResult.value) return 'status-success'
  return 'status-default'
})

// 组件卸载时清除定时器
const onUnmounted = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
}

// 初始转换
convertYamlToJson(yamlContent.value)

const save = () => {
  console.log("保存，yaml 格式：", yamlContent.value)
  console.log("保存，json 格式：", jsonResult.value)
  // 解析JSON获取master块
  try {
    const jsonObject = JSON.parse(jsonResult.value)
    console.log("保存，master 块：", jsonObject?.base?.datasource?.hikari?.master)
  } catch (e) {
    console.error("解析JSON失败：", e)
  }
}
</script>

<style scoped>
.converter-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}

.editor-container {
  display: flex;
  gap: 20px;
  height: 80vh;
}

.editor-panel, .result-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

h3 {
  margin: 0;
  padding: 12px 16px;
  background-color: #f1f5f9;
  color: #334155;
  font-size: 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-indicator {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: normal;
}

.status-pending {
  background-color: #eff6ff;
  color: #3b82f6;
}

.status-error {
  background-color: #fee2e2;
  color: #dc2626;
}

.status-success {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-default {
  background-color: #f3f4f6;
  color: #6b7280;
}

.editor-footer {
  padding: 8px 16px;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.json-display {
  flex: 1;
  overflow: auto;
  position: relative;
}

pre {
  margin: 0;
  padding: 16px;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

.valid {
  color: #1e293b;
  background-color: #f8fafc;
}

.error-container {
  padding: 16px;
  background-color: #fef2f2;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #dc2626;
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 16px;
}

.error-details {
  color: #b91c1c;
  font-family: monospace;
  font-size: 14px;
  flex: 1;
}

.error-hint {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #fecaca;
  color: #991b1b;
  font-size: 13px;
}

/* 移除加载状态样式 */
.spinner, .waiting, .loading {
  display: none;
}

/* 编辑器样式穿透 */
:deep(.monaco-editor) {
  border-radius: 0 !important;
}
</style>