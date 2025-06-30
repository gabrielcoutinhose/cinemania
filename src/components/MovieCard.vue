<template>
  <div class="card">
    <img :src="imageUrl" :alt="movie.title || 'Capa do filme'" />
    <h3 class="title">{{ movie.title }}</h3>
    <div class="actions">
      <button @click="$emit('add-to-favorites')" aria-label="Adicionar aos favoritos">
        <font-awesome-icon icon="heart" />
      </button>
      <button @click="$emit('add-to-cart')" aria-label="Adicionar ao carrinho">
        <font-awesome-icon icon="shopping-cart" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() =>
  props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : new URL("@/assets/fallback-poster.jpg", import.meta.url).href,
);
</script>

<style lang="scss" scoped>
.card {
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.25s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: white;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;

    button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition:
        transform 0.2s,
        color 0.2s;

      &:hover {
        transform: scale(1.2);
        color: #f44336;
      }

      &:focus {
        outline: 2px solid #2196f3;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
}
</style>
