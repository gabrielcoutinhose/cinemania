<template>
  <div class="cart-summary">
    <h2>Resumo do Carrinho</h2>

    <CartItemList :items="cart" @remove="removeItem" />

    <p class="total">Total: R$ {{ total.toFixed(2) }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CartItemList from "./CartItemList.vue";

const store = useStore();
const cart = computed(() => store.state.cart);

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
);

const removeItem = (id) => store.commit("removeFromCart", id);
</script>
