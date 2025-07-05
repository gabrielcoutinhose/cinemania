<template>
  <section class="checkout-layout">
    <Loader v-if="isLoading" />
    <div v-else>
      <h1 class="page-title">Finalizar</h1>
      <div :class="['checkout-grid', { 'column-mode': showSidebar }]">
        <CheckoutCard />
        <Form @submit-success="handleSuccess" />
      </div>
    </div>
    <SuccessModal :show="showModal" @close="showModal = false" autoClose />
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Loader from "./Loader.vue";

import { useHomeViewModel } from "@/viewmodels/HomeViewModel";

import { ref } from "vue";
import Form from "@/components/Form.vue";
import CheckoutCard from "@/components/CheckoutCard.vue";
import SuccessModal from "@/components/SuccessModal.vue";

const { showFavorites, showCart } = useHomeViewModel();

const showSidebar = computed(() => showFavorites.value || showCart.value);

const store = useStore();
const isLoading = computed(() => store.state.isLoading);

onMounted(() => store.dispatch("loadMovies"));

const showModal = ref(false);
const handleSuccess = () => (showModal.value = true);
</script>

<style scoped>
.page-title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.checkout-layout {
  width: 100%;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.checkout-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;

  & > * {
    flex: 1 1 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    & > * {
      flex: 1 1 48%;
    }
  }
}

.checkout-grid.column-mode {
  flex-direction: column;

  & > * {
    flex: 1 1 100%;
  }
}
</style>
