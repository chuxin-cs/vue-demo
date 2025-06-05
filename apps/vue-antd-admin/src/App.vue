<script lang="ts" setup>
import { App, ConfigProvider } from 'ant-design-vue';

</script>

<template>
  <div>
    <ConfigProvider>
      <App>
        <router-view></router-view>
      </App>
    </ConfigProvider>
  </div>
</template>