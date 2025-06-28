<template>
  <header class="header">
    <div class="left">
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
    </div>

    <form @submit.prevent="handleSearch" class="search">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar filme..."
        class="search-input"
      />
      <button type="submit" class="search-btn">
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <div class="icons">
      <button @click="$emit('toggle-favorites')">
        <font-awesome-icon icon="heart" />
      </button>
      <button @click="$emit('toggle-cart')">
        <font-awesome-icon icon="shopping-cart" />
      </button>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    ...mapActions(['searchMovies']),
    handleSearch() {
      if (this.search.trim().length > 0) {
        this.searchMovies(this.search.trim());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #121212;
  color: white;

  .logo {
    height: 32px;
  }

  .search {
    flex: 1;
    margin: 0 2rem;
    display: flex;

    .search-input {
      flex: 1;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px 0 0 4px;
    }

    .search-btn {
      background: #2196f3;
      border: none;
      color: white;
      padding: 0 1rem;
      border-radius: 0 4px 4px 0;
      cursor: pointer;

      font-awesome-icon {
        color: white;
      }
    }
  }

  .icons {
    display: flex;
    gap: 1rem;

    button {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}
</style>
