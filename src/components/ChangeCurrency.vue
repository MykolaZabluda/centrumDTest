<template>
  <div class="wrapper">
    <h2>Changed Exchange Rates</h2>
    <div v-if="changedRates.length > 0" class="wrapper-cards">
      <div
          v-for="currency in paginatedChangedRates"
          :key="currency.r030"
          class="currency-card"
      >
        <h3>{{ currency.txt }}</h3>
        <p>Rate: {{ currency.rate }}</p>
        <p>Code: {{ currency.cc }}</p>
      </div>
    </div>
    <div v-else>No rates have been changed.</div>

    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <div class="page-numbers">
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changedRates: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedChangedRates() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.changedRates.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.changedRates.length / this.itemsPerPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    const savedRates = localStorage.getItem('changedRates');
    if (savedRates) {
      this.changedRates = JSON.parse(savedRates);
    }
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 50%;
  margin: auto;

  &-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 15px;

    .currency-card {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .page-numbers {
      display: flex;
      gap: 5px;

      & button {
        padding: 5px 10px;
        border: 1px solid #ccc;
        background-color: white;
        cursor: pointer;

        &.active {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }
      }
    }
  }
}
</style>
