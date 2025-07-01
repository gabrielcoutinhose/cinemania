<template>
  <section class="box">
    <section class="box">
      <Loader v-if="isLoading" />
      <div v-else>
        <slot />
      </div>
    </section>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Loader from "./Loader.vue";

const store = useStore();
const isLoading = computed(() => store.state.isLoading);

onMounted(() => store.dispatch("loadMovies"));
</script>

<style lang="scss" scoped>
.box {
  flex: 1;
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
</style>
