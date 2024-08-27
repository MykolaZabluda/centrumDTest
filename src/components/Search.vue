<template>
  <div>
    <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search by name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style scoped lang="scss">
input {
  margin: 20px auto;
  width: 70%;;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 10px;
}
</style>
