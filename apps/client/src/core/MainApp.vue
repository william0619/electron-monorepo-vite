<!--基础入口-->
<template>
  <router-view></router-view>
</template>

<script setup lang="ts" name="MainApp">
import { onMounted } from 'vue'

onMounted(() => {
  // 如果是 client
  const ele = window.electron
  if (ele) {
    ele.ipcRenderer.once('setWinName', (name) => {
      window.winName = name
    })
  }
})
</script>

<style scoped></style>
