<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Edit Currency Rate</h2>
      <div>
        <label for="currencyName">Currency Name:</label>
        <input type="text" v-model="currency.txt" disabled />
      </div>
      <div>
        <label for="currencyRate">Rate:</label>
        <input type="number" v-model="currency.rate" />
      </div>
      <button @click="saveChanges">Save</button>
      <button @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    currency: Object,
  },
  methods: {
    saveChanges() {
      this.$emit('save', this.currency);
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    button {
      margin-top: 10px;
      padding: 10px;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;

      &:first-of-type {
        margin-right: 10px;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>
