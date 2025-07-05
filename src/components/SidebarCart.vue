<template>
  <aside class="sidebar">
    <h2>Carrinho</h2>

    <CartTable :items="cart" @remove="removeFromCart" />

    <button v-if="cart.length" class="checkout" @click="$emit('go-checkout')">Finalizar</button>

    <button class="close" @click="$emit('close')">Fechar</button>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CartTable from "./CartTable.vue";

const store = useStore();
const cart = computed(() => store.state.cart);

const removeFromCart = (id) => store.commit("removeFromCart", id);
</script>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
  height: 100%;
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .checkout {
    background-color: var(--color-aux);
    color: var(--color-text-primary);
    margin-top: 0.5rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    padding: 0.7rem 1rem;
    width: 100%;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }

  .close {
    background-color: var(--color-aux);
    color: var(--color-text-primary);
    margin-top: 0.5rem;
    padding: 0.7rem 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    width: 100%;

    &:hover {
      opacity: 0.8;
    }
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
