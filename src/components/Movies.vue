<template>
  <section class="movies">
    <Loader v-if="loading" />
    <div class="grid" v-else>
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @addToFavorites="toggleFavorite(movie)"
        @addToCart="toggleCart(movie)"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MovieCard from "./MovieCard.vue";
import Loader from "./Loader.vue";

export default {
  name: "Movies",
  components: { MovieCard, Loader },
  computed: {
    ...mapState(["movies", "loading"]),
  },
  methods: {
    ...mapActions(["loadMovies", "toggleFavorite", "toggleCart"]),
  },
  created() {
    this.loadMovies();
  },
};
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
