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
    addToCart(state, movie) {
      if (!state.cart.some((m) => m.id === movie.id)) {
        state.cart.push(movie);
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
      const action = getters.isFavorite(movie.id) ? "removeFromFavorites" : "addToFavorites";
      commit(action, movie.id || movie);
    },

    toggleCart({ commit, getters }, movie) {
      const action = getters.isInCart(movie.id) ? "removeFromCart" : "addToCart";
      commit(action, movie.id || movie);
    },

    async finalizePurchase({ commit }) {
      commit("setPurchaseStatus", null);
      commit("setLoading", true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        commit("clearCart");
        commit("setPurchaseStatus", "success");
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
