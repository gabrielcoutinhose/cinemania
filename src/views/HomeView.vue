<template>
  <div class="main-container" :class="{ 'sidebar-open': showFavorites || showCart }">
    <Header />
    <Movies />
    <SidebarFavorites v-if="showFavorites" @close="toggleFavorites" class="sidebar favorites" />
    <SidebarCart v-if="showCart" @close="toggleCart" @go-checkout="goCheckout" class="sidebar cart" />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Movies from "@/components/Movies.vue";
import SidebarFavorites from "@/components/SidebarFavorites.vue";
import SidebarCart from "@/components/SidebarCart.vue";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";

const { showFavorites, showCart, toggleFavorites, toggleCart, goCheckout } = useHomeViewModel();
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .sidebar {
    width: 300px;
    background: #1f1f1f;
    color: white;
    overflow-y: auto;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 10;

    &.favorites {
      order: 1;
      transform: translateX(-100%);
    }

    &.cart {
      order: 3;
      transform: translateX(100%);
    }
  }

  &.sidebar-open {
    .favorites,
    .cart {
      transform: translateX(0);
    }
  }

  > *:nth-child(2) {
    flex: 1;
    order: 2;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .sidebar {
      width: 100%;
      height: 50vh;
      transform: translateY(100%);
      position: fixed;
      bottom: 0;
      left: 0;
      border-radius: 12px 12px 0 0;
    }

    &.sidebar-open {
      .favorites,
      .cart {
        transform: translateY(0);
      }
    }

    > *:nth-child(2) {
      order: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
