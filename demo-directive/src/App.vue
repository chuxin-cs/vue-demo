<script setup lang="ts">
const submit = () => {
  console.log('提交');
}
</script>

<template>
  <div>
    <h1>Vue Directive</h1>
    <button v-debounce:2000.leading="submit">提交</button>
  </div>
</template>