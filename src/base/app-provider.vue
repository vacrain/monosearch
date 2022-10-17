<script setup lang="ts">
  import { darkTheme } from 'naive-ui'
  import App from '../components/App.vue'
</script>
<template>
  <n-config-provider :theme="darkTheme">
    <app />
  </n-config-provider>
</template>
