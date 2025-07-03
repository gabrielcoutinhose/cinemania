<template>
  <button class="theme-toggle" @click="toggleTheme" :aria-label="`Alternar para tema ${nextTheme}`">
    <span v-if="theme === 'dark'" class="icon">🌙</span>
    <span v-else class="icon">🌞</span>
  </button>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const theme = computed(() => store.state.theme);
const nextTheme = computed(() => (theme.value === "dark" ? "claro" : "escuro"));

const toggleTheme = () => {
  store.dispatch("toggleTheme");
};
</script>

<style scoped lang="scss">
.theme-toggle {
  background-color: var(--color-base);
  color: var(--color-text-primary);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: var(--color-primary);
  }

  .icon {
    pointer-events: none;
    transition: transform 0.3s;
  }

  &:active .icon {
    transform: scale(0.9);
  }
}
</style>
