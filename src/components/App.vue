<script setup lang="ts">
  let value = $ref(null)
</script>

<template>
  <n-input
    v-model:value="value"
    clearable
    type="text"
    placeholder="请输入要搜索的内容"
  />
</template>

<style scoped></style>
