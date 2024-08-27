<template>
  <div class="wrapper">
    <Search @search="handleSearch" />
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div class="wrapper-cards" v-else>
      <div
          class="currency-card"
          v-for="currency in filteredCurrencies"
          :key="currency.r030"
          @click="openModal(currency)"
      >
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

    <EditCurrency
        :show="isModalVisible"
        :currency="selectedCurrency"
        @save="saveCurrency"
        @close="closeModal"
    />
  </div>
</template>

<script>
import Search from './Search.vue';
import EditCurrency from "@/components/modals/EditCurrency.vue";

export default {
  components: {
    EditCurrency,
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
      isModalVisible: false,
      selectedCurrency: null,
      changedRates: [],
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
    openModal(currency) {
      this.selectedCurrency = { ...currency };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedCurrency = null;
    },
    saveCurrency(updatedCurrency) {
      const index = this.currencies.findIndex(currency => currency.r030 === updatedCurrency.r030);
      if (index !== -1) {
        this.currencies[index] = updatedCurrency;
      }

      const changedIndex = this.changedRates.findIndex(currency => currency.r030 === updatedCurrency.r030);
      if (changedIndex !== -1) {
        this.changedRates[changedIndex] = updatedCurrency;
      } else {
        this.changedRates.push(updatedCurrency);
      }

      localStorage.setItem('changedRates', JSON.stringify(this.changedRates));

      this.closeModal();
    }
  },
  mounted() {
    this.fetchCurrencies();
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
