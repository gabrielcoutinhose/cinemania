<template>
  <header class="header" ref="header">
    <div class="left">
      <img src="@/assets/logo.jpg" alt="Logo da Loja de Filmes" class="logo" />
    </div>

    <form @submit.prevent="handleSearch" class="search" role="search" aria-label="Buscar filme">
      <input
        v-if="showSearchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Buscar filme..."
        class="search-input"
        aria-label="Campo de busca"
        ref="searchInput"
      />
      <button
        type="submit"
        class="search-btn"
        aria-label="Buscar"
        @click.prevent="toggleSearchInput"
      >
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <div class="icons">
      <button @click="$emit('toggle-favorites')" aria-label="Favoritos">
        <font-awesome-icon icon="heart" />
      </button>
      <button @click="$emit('toggle-cart')" aria-label="Carrinho">
        <font-awesome-icon icon="shopping-cart" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const header = ref(null);
const searchInput = ref(null);
const searchQuery = ref("");
const showSearchInput = ref(window.innerWidth > 600);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) store.dispatch("searchMovies", query);
};

const toggleSearchInput = () => {
  if (window.innerWidth <= 600) {
    showSearchInput.value = !showSearchInput.value;
    if (!showSearchInput.value) searchQuery.value = "";
    else nextTick(() => searchInput.value?.focus());
  } else {
    handleSearch();
  }
};

const handleClickOutside = (event) => {
  if (showSearchInput.value && window.innerWidth <= 600 && !header.value?.contains(event.target)) {
    showSearchInput.value = false;
    searchQuery.value = "";
  }
};

onMounted(() => window.addEventListener("click", handleClickOutside));
onUnmounted(() => window.removeEventListener("click", handleClickOutside));
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #121212;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .left {
    .logo {
      height: 32px;
    }
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
      font-size: 1rem;
    }

    .search-btn {
      background: #2196f3;
      border: none;
      color: white;
      padding: 0 1rem;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      display: flex;
      align-items: center;

      svg {
        width: 1rem;
        height: 1rem;
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
      transition:
        transform 0.2s,
        color 0.2s;

      &:hover {
        transform: scale(1.2);
        color: #f44336;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 0.5rem 1rem;

    .search {
      margin: 0 0.5rem;

      .search-input {
        width: 100%;
        padding: 0.4rem 0.8rem;
      }
    }
  }
}
</style>
