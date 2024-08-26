<template>
  <div>
    <CurrencyList />
  </div>
</template>

<script>
import CurrencyList from "@/components/CurrencyList.vue"
import Search from "@/components/Search.vue";

export default {
  components: {
    Search,
    CurrencyList,
  }
}
</script>

<style scoped lang="scss"></style>