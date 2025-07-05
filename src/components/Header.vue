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

    <ThemeToggle class="theme-toggle" />

    <div class="sidebar-icons">
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
const showSearchInput = ref(window.innerWidth > 768);

const favoritesCount = computed(() => store.state.favorites.length);
const cartCount = computed(() => store.state.cart.length);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    store.dispatch("searchMovies", query);
    if (window.innerWidth <= 768) {
      showSearchInput.value = false;
      searchQuery.value = "";
    }
  } else {
    toggleSearchInput();
  }
};

const toggleSearchInput = () => {
  if (window.innerWidth <= 768) {
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
    window.innerWidth <= 768 &&
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
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--color-base);
  color: var(--color-text-primary);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .left .logo {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    margin-right: calc(1rem - 8px);
  }

  .search {
    flex: 1;
    margin: 0 1rem;
    display: flex;

    .search-input {
      color: var(--color-text-primary);
      background: var(--color-aux);
      flex: 1;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px 0 0 4px;
      font-size: 1rem;

      &:focus {
        border: none;
        outline-color: var(--color-accent);
        outline-width: 0.25px;
      }
    }

    .search-btn {
      margin-left: 2px;
      background: var(--color-aux);
      border: none;
      border-radius: 0 4px 4px 0;
      color: var(--color-text-primary);
      padding: 0 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;

      svg {
        width: 1rem;
        height: 1rem;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .theme-toggle {
    margin-right: calc(1rem - 5px);
    margin-top: -4px;
  }

  .sidebar-icons {
    display: flex;
    gap: 1rem;

    button {
      background: none;
      border: none;
      color: var(--color-text-primary);
      font-size: 1.5rem;
      cursor: pointer;
      transition:
        transform 0.2s,
        color 0.2s;

      &:hover {
        transform: scale(1.2);
        color: var(--color-accent);
      }
    }

    .badge {
      background: var(--color-aux);
      color: var(--color-text-primary);
      border-radius: 50%;
      font-size: 0.75rem;
      padding: 0.25em 0.5em;
      margin-left: 0.3rem;
    }
  }

  @media (max-width: 768px) {
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
