<template>
  <header class="header" ref="header">
    <div class="left">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo da Loja de Filmes" class="logo" />
      </router-link>
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
      <button type="submit" class="search-btn" aria-label="Buscar">
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <ThemeToggle />

    <div class="icons">
      <button @click="$emit('toggle-favorites')" aria-label="Abrir favoritos">
        <font-awesome-icon icon="heart" />
        <span v-if="favoritesCount > 0" class="badge">{{ favoritesCount }}</span>
      </button>
      <button @click="$emit('toggle-cart')" aria-label="Abrir carrinho">
        <font-awesome-icon icon="shopping-cart" />
        <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from "@/components/ThemeToggle.vue";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();
const header = ref(null);
const searchInput = ref(null);
const searchQuery = ref("");
const showSearchInput = ref(window.innerWidth > 600);

const favoritesCount = computed(() => store.state.favorites.length);
const cartCount = computed(() => store.state.cart.length);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    store.dispatch("searchMovies", query);
    if (window.innerWidth <= 600) {
      showSearchInput.value = false;
      searchQuery.value = "";
    }
  } else {
    toggleSearchInput();
  }
};

const toggleSearchInput = () => {
  if (window.innerWidth <= 600) {
    showSearchInput.value = !showSearchInput.value;
    if (showSearchInput.value) {
      nextTick(() => searchInput.value?.focus());
    } else {
      searchQuery.value = "";
    }
  }
};

const handleClickOutside = (event) => {
  if (
    showSearchInput.value &&
    window.innerWidth <= 600 &&
    header.value &&
    !header.value.contains(event.target)
  ) {
    showSearchInput.value = false;
    searchQuery.value = "";
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #121212;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .left .logo {
    height: 32px;
    
    router-link {
    text-decoration: none;
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

    .badge {
      background: red;
      color: white;
      border-radius: 50%;
      font-size: 0.75rem;
      padding: 0.25em 0.5em;
      margin-left: 0.3rem;
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
