<template>
  <div class="page-container">
    <Header @toggle-favorites="toggleFavorites" @toggle-cart="toggleCart" />
    <div class="main-content">
      <MainCheckoutBox class="checkout-content" />
      <SidebarFavorites v-if="showFavorites" @close="toggleFavorites" class="sidebar" />
      <SidebarCart v-if="showCart" @close="toggleCart" class="sidebar" />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import MainCheckoutBox from "@/components/CheckoutContent.vue";
import SidebarFavorites from "@/components/SidebarFavorites.vue";
import SidebarCart from "@/components/SidebarCart.vue";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";

const { showFavorites, showCart, toggleFavorites, toggleCart } = useHomeViewModel();
</script>

<style scoped lang="scss">

.header {
  width: 100%;
  max-width: none;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  min-width: 0;
  max-width: 100vw;
  overflow-x: hidden;
  width: 300px;
  background-color: var(--color-base);
  color: var(--color-text-primary);
  padding: 1.5rem;
  overflow-y: auto;
}

.main-content > :not(.sidebar) {
  flex: 1;
  overflow-y: auto;
}

.checkout-content {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) var(--color-base);
}

.checkout-content::-webkit-scrollbar {
  width: 8px;
}

.checkout-content::-webkit-scrollbar-track {
  background: var(--color-base);
  border-radius: 4px;
}

.checkout-content::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 8px;
  border: 2px solid var(--color-base);
}

.checkout-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}

.page-container,
.main-content,
.checkout-content {
  max-width: 100vw;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
  }
}
</style>
