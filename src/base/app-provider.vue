<script setup lang="ts">
  import { darkTheme, lightTheme } from 'naive-ui'
  import App from '../components/App.vue'
  import MessageApi from './message-api.vue'
</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-loading-bar-provider>
          <message-api />
        </n-loading-bar-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-dialog-provider>

  <n-config-provider :theme="lightTheme">
    <n-theme-editor />
    <app />
  </n-config-provider>
</template>
