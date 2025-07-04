<template>
  <div class="page-container">
    <Header @toggle-favorites="toggleFavorites" @toggle-cart="toggleCart" />
    <div class="main-content">
      <HomeContent class="home-content" />
      <SidebarFavorites v-if="showFavorites" @close="toggleFavorites" class="sidebar" />
      <SidebarCart v-if="showCart" @close="toggleCart" @go-checkout="goCheckout" class="sidebar" />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import HomeContent from "@/components/HomeContent.vue";
import SidebarFavorites from "@/components/SidebarFavorites.vue";
import SidebarCart from "@/components/SidebarCart.vue";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";

const { showFavorites, showCart, toggleFavorites, toggleCart, goCheckout } = useHomeViewModel();
</script>

<style scoped lang="scss">
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

.home-content {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) var(--color-base);
}

.home-content::-webkit-scrollbar {
  width: 8px;
}

.home-content::-webkit-scrollbar-track {
  background: var(--color-base);
  border-radius: 4px;
}

.home-content::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 8px;
  border: 2px solid var(--color-base);
}

.home-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}

@media (max-width: 768px) {
}
</style>
