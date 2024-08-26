<template>
  <div class="wrapper">
    <Search @search="handleSearch" />
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div class="wrapper-cards" v-else>
      <div class="currency-card" v-for="currency in filteredCurrencies" :key="currency.r030">
        <h3>{{ currency.txt }}</h3>
        <p>Rate: {{ currency.rate }}</p>
        <p>Code: {{ currency.cc }}</p>
      </div>
    </div>
    <div class="pagination">
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
import Search from './Search.vue';

export default {
  components: {
    Search,
  },
  data() {
    return {
      currencies: [],
      currentPage: 1,
      itemsPerPage: 10,
      loading: true,
      error: null,
      searchQuery: '',
    };
  },
  computed: {
    filteredCurrencies() {
      const filtered = this.currencies.filter(currency =>
          currency.txt.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      const filtered = this.currencies.filter(currency =>
          currency.txt.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchCurrencies() {
      this.loading = true;
      fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
          .then((response) => response.json())
          .then((data) => {
            this.currencies = data;
            this.loading = false;
          })
          .catch((error) => {
            this.error = "Failed to load data.";
            this.loading = false;
          });
    },
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
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchCurrencies();
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
