<template>
  <aside class="sidebar">
    <h2>Favoritos</h2>
    <ul>
      <li v-for="movie in favorites" :key="movie.id">
        {{ movie.title }}
        <button @click="toggleFavorite(movie)" aria-label="Remover dos favoritos">
          <font-awesome-icon icon="heart" />
        </button>
      </li>
    </ul>
    <button class="close" @click="$emit('close')">Fechar</button>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const favorites = computed(() => store.state.favorites);
const toggleFavorite = (movie) => store.dispatch("toggleFavorite", movie);
</script>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
  height: 100%;
  background: #1e1e1e;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      button {
        background-color: transparent;
        color: var(--color-text-primary);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.2rem 0.5rem;
        border: none;
        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background-color: var(--color-accent);
          opacity: 0.8;
        }
      }
    }
  }

  .close {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    margin-top: auto;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    width: 100%;
    transition: background 0.2s;

    &:hover {
      background-color: var(--color-accent);
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    border-radius: 12px 12px 0 0;
  }
}
</style>
