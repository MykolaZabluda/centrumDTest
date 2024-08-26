<template>
  <div class="wrapper">
    <h2>Exchange Rate Search</h2>
    <div class="filter">
      <label for="date">Select Date:</label>
      <input type="date" v-model="selectedDate" @change="fetchExchangeRates" />
    </div>

    <div class="result" v-if="selectedDate">
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div class="result-cards" v-else>
        <div class="currency-card" v-for="currency in paginatedCurrencies" :key="currency.r030">
          <h3>{{ currency.txt }}</h3>
          <p>Rate: {{ currency.rate }}</p>
          <p>Code: {{ currency.cc }}</p>
        </div>
      </div>
      <div class="pagination" v-if="paginatedCurrencies.length > 0">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '',
      exchangeRates: [],
      loading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: '',
    };
  },
  methods: {
    fetchExchangeRates() {
      if (!this.selectedDate) {
        return;
      }

      this.loading = true;
      this.error = null;

      fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${this.formatDate(this.selectedDate)}&json`)
          .then((response) => response.json())
          .then((data) => {
            this.exchangeRates = data;
            this.loading = false;
          })
          .catch((error) => {
            this.error = "Failed to load data.";
            this.loading = false;
          });
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
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
  },
  computed: {
    paginatedCurrencies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.exchangeRates.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.exchangeRates.length / this.itemsPerPage);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  .filter {
    margin-bottom: 20px;
  }

  .result {
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
}
</style>
