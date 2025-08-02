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
          <pre v-if="jsonResult" class="valid">{{ jsonResult }}</pre>

          <!-- 友好的错误提示 -->
          <div v-if="errorMessage" class="error-container">
            <div class="error-header">
              <i class="icon-warning">⚠️</i>
              <span>格式有误，请检查</span>
            </div>
            <div class="error-details">
              <p>{{ friendlyErrorMsg }}</p>
              <p class="error-hint">提示：YAML 要求严格的缩进和语法，例如列表项需要用短横线开头</p>
            </div>
          </div>

          <div v-if="isWaiting" class="waiting">
            <div class="spinner"></div>
            <p>正在等待输入完成...</p>
          </div>

          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
            <p>正在转换...</p>
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
const isLoading = ref(false)
const isWaiting = ref(false)
let debounceTimer = null

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

  // 显示等待状态
  isWaiting.value = true
  isLoading.value = false
  jsonResult.value = ''
  rawErrorMessage.value = ''

  // 设置1秒延迟后转换
  debounceTimer = setTimeout(() => {
    isWaiting.value = false
    isLoading.value = true
    convertYamlToJson(value)
  }, 1000)
}

// 转换逻辑
const convertYamlToJson = (yaml) => {
  try {
    // 解析YAML并转换为JSON
    const parsedData = jsYaml.load(yaml)
    jsonResult.value = JSON.stringify(parsedData, null, 2)
    rawErrorMessage.value = ''
  } catch (error) {
    // 捕获错误但不显示过于技术化的信息
    rawErrorMessage.value = error.message
    jsonResult.value = ''
  } finally {
    isLoading.value = false
    isWaiting.value = false
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

// 计算属性 - 状态文本和样式
const statusText = computed(() => {
  if (isWaiting.value) return '等待输入完成...'
  if (isLoading.value) return '正在转换...'
  if (rawErrorMessage.value) return '存在格式问题'
  if (jsonResult.value) return '转换完成'
  return '准备就绪'
})

const statusClass = computed(() => {
  if (isWaiting.value || isLoading.value) return 'status-pending'
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
  console.log("保存，json 格式, master 块：", jsonResult.value)
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

.waiting, .loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  color: #64748b;
  gap: 12px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 编辑器样式穿透 */
:deep(.monaco-editor) {
  border-radius: 0 !important;
}
</style>
