<template>
  <section class="movies">
    <Loader v-if="isLoading" />
    <div v-else class="grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @add-to-favorites="toggleFavorite(movie)"
        @add-to-cart="toggleCart(movie)"
      />
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import MovieCard from "./MovieCard.vue";
import Loader from "./Loader.vue";

const store = useStore();
const movies = computed(() => store.state.movies);
const isLoading = computed(() => store.state.isLoading);

const toggleFavorite = (movie) => store.dispatch("toggleFavorite", movie);
const toggleCart = (movie) => store.dispatch("toggleCart", movie);

onMounted(() => store.dispatch("loadMovies"));
</script>

<style lang="scss" scoped>
.movies {
  flex: 1;
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
</style>
