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

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SidebarFavorites",
  computed: {
    ...mapState(["favorites"]),
  },
  methods: {
    ...mapActions(["toggleFavorite"]),
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
  background: #1e1e1e;
  color: white;
  padding: 1.5rem;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    flex: 1 1 auto;
    overflow-y: auto;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    button {
      background: transparent;
      border: none;
      color: #f44336;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(244, 67, 54, 0.2);
      }
    }
  }

  .close {
    margin-top: 2rem;
    background: #444;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 50vh;
    border-radius: 12px 12px 0 0;
  }
}
</style>
