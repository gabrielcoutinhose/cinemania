import { createStore } from "vuex";
import axios from "axios";
import { fetchPopularMovies } from "@/services/api";

export default createStore({
  state: {
    movies: [],
    favorites: [],
    cart: [],
    isLoading: false,
    purchaseStatus: null,
    theme: "dark",
  },

  getters: {
    isFavorite: (state) => (movieId) => state.favorites.some((movie) => movie.id === movieId),
    isInCart: (state) => (movieId) => state.cart.some((movie) => movie.id === movieId),
    totalCartItems: (state) => state.cart.length,
  },

  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    addToFavorites(state, movie) {
      if (!state.favorites.some((m) => m.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter((m) => m.id !== movieId);
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    addToCart(state, movie) {
      if (!state.cart.some((m) => m.id === movie.id)) {
        state.cart.push({
          ...movie,
          price: movie.price ?? 19.99,
        });
      }
    },
    removeFromCart(state, movieId) {
      state.cart = state.cart.filter((m) => m.id !== movieId);
    },
    clearCart(state) {
      state.cart = [];
    },
    setPurchaseStatus(state, status) {
      state.purchaseStatus = status;
    },
    setTheme(state, theme) {
      state.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("user-theme", theme);
    },
  },

  actions: {
    async loadMovies({ commit }) {
      commit("setLoading", true);
      try {
        const movies = await fetchPopularMovies();
        commit("setMovies", movies);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async searchMovies({ commit }, query) {
      commit("setLoading", true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/search/movie`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            query,
            language: "pt-BR",
          },
        });
        commit("setMovies", data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        commit("setMovies", []);
      } finally {
        commit("setLoading", false);
      }
    },
    toggleFavorite({ commit, getters }, movie) {
      if (!movie?.id) return;
      if (getters.isFavorite(movie.id)) {
        commit("removeFromFavorites", movie.id);
      } else {
        commit("addToFavorites", movie);
      }
    },
    toggleCart({ commit, getters }, movie) {
      if (!movie?.id) return;
      if (getters.isInCart(movie.id)) {
        commit("removeFromCart", movie.id);
      } else {
        commit("addToCart", movie);
      }
    },
    async finalizePurchase({ commit }) {
      commit("setPurchaseStatus", null);
      commit("setLoading", true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        commit("clearCart");
        commit("clearFavorites");
        commit("setPurchaseStatus", "success");
      } finally {
        commit("setLoading", false);
      }
    },
    initTheme({ commit }) {
      const saved = localStorage.getItem("user-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved || (prefersDark ? "dark" : "light");
      commit("setTheme", theme);
    },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      commit("setTheme", newTheme);
    },
  },
});
