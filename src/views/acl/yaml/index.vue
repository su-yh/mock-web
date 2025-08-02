<template>
  <div class="yaml-editor">
    <MonacoEditor
        v-model:value="yamlContent"
        :options="editorOptions"
        height="400px"
        width="100%"
        @update:value="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js' // 引入 YAML 语言支持

// 初始 YAML 内容
const yamlContent = ref(`# YAML 示例
title: Vue 3 Monaco 编辑器
settings:
  theme: light
  fontSize: 14
features:
  - 语法高亮
  - 自动补全
  - 错误提示
`)

// 编辑器配置
const editorOptions = {
  language: 'yaml', // 设置为 YAML 语言
  lineNumbers: 'on',
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  folding: true,
  automaticLayout: true // 自动适应容器大小
}

// 内容变化处理
const handleChange = (value:any) => {
  console.log('YAML 内容更新:', value)
  // 这里可以添加验证逻辑
}
</script>

<script lang="ts">
export default {
  name: 'Permission'
}
</script>

<style scoped>
.yaml-editor {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px;
}
</style>
