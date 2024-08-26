<template>
  <div class="header">
    <p class="header-title">Header</p>
    <div class="nav-block">
      <router-link class="nav-block-link" to="/">Home Page</router-link>
      <router-link class="nav-block-link" to="/change">Change Courses</router-link>
      <router-link class="nav-block-link" to="/search">Search</router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background: black;

  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 15px 25px;
    text-align: left;
    color: #fff;
  }

  .nav-block {
    display: flex;
    align-items: center;
    margin-right: 25px;

    &-link {
      padding: 0 10px;
      text-decoration: none;
      font-size: 22px;
      color: #fff;
    }
  }
}
</style>