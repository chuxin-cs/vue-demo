<script setup lang="ts">
import { ref } from 'vue'
const msg = ref("hello world")
</script>

<template>
  <div>
    <h1>demo-hello-world</h1>
    <div>{{msg}}</div>
  </div>
</template>