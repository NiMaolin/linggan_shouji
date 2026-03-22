<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { saveLinggan } from '../api/linggan'

// 控制对话框显示
const dialogVisible = ref(false)
// 输入框内容
const inputValue = ref('')
// 提交中状态
const submitting = ref(false)

function openDialog() {
  inputValue.value = ''
  dialogVisible.value = true
}

async function handleConfirm() {
  const content = inputValue.value.trim()
  if (!content) {
    ElMessage.warning('请输入内容')
    return
  }

  submitting.value = true
  try {
    await saveLinggan(content)
    ElMessage.success('保存成功！')
    dialogVisible.value = false
    inputValue.value = ''
  } catch (e) {
    ElMessage.error(e instanceof Error ? e.message : '保存失败，请重试')
  } finally {
    submitting.value = false
  }
}

function handleCancel() {
  dialogVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <div class="page">
    <!-- 触发按钮 -->
    <el-button type="primary" size="large" @click="openDialog">
      记录灵感 📝✅热更新测试
    </el-button>

    <!-- 弹出对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="记录灵感"
      width="320px"
      :close-on-click-modal="false"
    >
      <el-input
        v-model="inputValue"
        type="textarea"
        :rows="4"
        placeholder="请输入你的灵感..."
        autofocus
      />
      <template #footer>
        <el-button @click="handleCancel" :disabled="submitting">取消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="submitting">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
