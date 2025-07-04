<template>
  <div class="cart-summary">
    <h2>Resumo do Carrinho</h2>

    <CartTable :items="cart" @remove="removeItem" />

    <p class="total">
      Total: <strong>R$ {{ total.toFixed(2) }}</strong>
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CartTable from "./CartTable.vue";

const store = useStore();
const cart = computed(() => store.state.cart);

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
);

const removeItem = (id) => store.commit("removeFromCart", id);
</script>

<style scoped>
.cart-summary {
  flex: 1 1 100%;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.cart-summary h2 {
  grid-column: span 2;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.total {
  grid-column: span 2;
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.1rem;
}

.remove-btn:hover {
  color: #dc2626;
}

.finalize-btn {
  grid-column: span 2;
  width: 100%;
  background-color: #6c5ce7;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.finalize-btn:hover {
  background-color: #5a4bd6;
}

@media (max-width: 768px) {
  .cart-summary {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .cart-summary h2,
  .total,
  .finalize-btn {
    grid-column: span 1;
    text-align: center;
  }
}
</style>
