<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t,locale } = useI18n({useScope: 'global'})
const title = t('system.settings.title')

import {ref} from "vue"
const currentLocale = ref(locale.value)
const changeLocale=  ()=>{
  locale.value = currentLocale.value
}
</script>

<template>
  <div>
    <div>{{ $t('common.light') }}</div>
    <div>{{ $t('system.settings.title') }}</div>
    <div>{{title}}</div>

    <!-- 主题切换 -->
    <select v-model="currentLocale" @change="changeLocale">
      <option value="en">English</option>
      <option value="zh_CN">中文</option>
    </select>
  </div>
</template>
