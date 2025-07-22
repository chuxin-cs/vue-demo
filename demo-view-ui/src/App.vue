<template>
  <Table row-key="id" :columns="columns16" :data="data12" border></Table>
</template>

<script>
import { columns16, data12 } from "./data.js"
export default {
  data() {
    return {
      columns16: columns16,
      data12: data12
    }
  }
}
</script>
