<template>
  <aside class="sidebar">
    <h2>Carrinho</h2>

    <CartItemList :items="cart" :showPrice="false" @remove="removeFromCart" />

    <button
      v-if="cart.length"
      class="checkout"
      @click="$emit('go-checkout')"
    >
      Finalizar Compra
    </button>

    <button class="close" @click="$emit('close')">Fechar</button>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CartItemList from "./CartItemList.vue";

const store = useStore();
const cart = computed(() => store.state.cart);

const removeFromCart = (id) => store.commit("removeFromCart", id);
</script>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
  background: #1e1e1e;
  color: white;
  padding: 1.5rem;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  .checkout {
    margin-top: 1rem;
    background: #4caf50;
    border: none;
    color: white;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: #45a049;
    }
  }

  .close {
    margin-top: 0.5rem;
    background: #444;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 50vh;
    border-radius: 12px 12px 0 0;
  }
}
</style>
