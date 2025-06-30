<template>
  <div class="main-container" :class="{ 'sidebar-open': showFavorites || showCart }">
    <Movies />
    <SidebarFavorites
      v-if="showFavorites"
      @close="$emit('close-favorites')"
      class="sidebar favorites"
    />
    <SidebarCart
      v-if="showCart"
      @close="$emit('close-cart')"
      @go-checkout="goCheckout"
      class="sidebar cart"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Movies from "@/components/MainHomeBox.vue";
import SidebarFavorites from "@/components/SidebarFavorites.vue";
import SidebarCart from "@/components/SidebarCart.vue";

defineProps({
  showFavorites: Boolean,
  showCart: Boolean,
});

const router = useRouter();

const goCheckout = () => {
  router.push({ name: "checkout" });
  defineEmits(["close-cart"])();
};
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

  > *:nth-child(1) {
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

    > *:nth-child(1) {
      order: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
