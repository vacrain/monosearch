<script setup lang="ts">
  import {
    useMessage,
    useDialog,
    useNotification,
    useLoadingBar
  } from 'naive-ui'
  // mount on window
  window.$message = useMessage()
  window.$dialog = useDialog()
  window.$notification = useNotification()
  window.$loadingBar = useLoadingBar()
</script>
<template>
  <div />
</template>
