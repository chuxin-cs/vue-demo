<script setup lang="ts">
import {computed} from "vue"
import {useUserStore} from "@/store"
const userStore = useUserStore()
const age = computed(()=>{
  return `age: ${userStore.user.age} 岁`
})
</script>

<template>
  <div>
    <h1>pinia 学习</h1>

    <!-- 用户user.ts -->
    <h2>用户：user</h2>
    <p>name: {{ userStore.user.name }}</p>
    <input type="text" v-model="userStore.user.name" />
    <p>{{age}}</p>
    <button @click="userStore.updateUser({age: 28})">更新用户信息</button>
  </div>
</template>