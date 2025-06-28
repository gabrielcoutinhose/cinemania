<template>
  <aside class="sidebar">
    <h2>Carrinho</h2>
    <ul>
      <li v-for="movie in cart" :key="movie.id">
        {{ movie.title }}
        <button @click="removeFromCart(movie.id)" aria-label="Remover do carrinho">Remover</button>
      </li>
    </ul>
    <button class="checkout" @click="goToCheckout">Finalizar Compra</button>
    <button class="close" @click="$emit('close')">Fechar</button>
  </aside>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SidebarCart",
  computed: {
    ...mapState(["cart"]),
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    removeFromCart(id) {
      this.removeFromCart(id);
    },
    goToCheckout() {
      this.$emit("go-checkout");
    },
  },
};
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

  ul {
    list-style: none;
    padding: 0;
    flex: 1 1 auto;
    overflow-y: auto;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    button {
      background: transparent;
      border: none;
      color: #f44336;
      cursor: pointer;
      font-weight: bold;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(244, 67, 54, 0.2);
      }
    }
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
    transition: background 0.3s ease;

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
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 50vh;
    border-radius: 12px 12px 0 0;
  }
}
</style>
