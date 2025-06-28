import { createStore } from 'vuex';
import { fetchPopularMovies } from '@/api/movies';

export default createStore({
  state: {
    movies: [],
    favorites: [],
    cart: [],
    loading: false,
    purchaseStatus: null,
  },

  getters: {
    isFavorite: (state) => (movieId) =>
      state.favorites.some((m) => m.id === movieId),
    isInCart: (state) => (movieId) =>
      state.cart.some((m) => m.id === movieId),
    totalCartItems: (state) => state.cart.length,
  },

  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    ADD_TO_FAVORITES(state, movie) {
      if (!state.favorites.some((m) => m.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    REMOVE_FROM_FAVORITES(state, movieId) {
      state.favorites = state.favorites.filter((m) => m.id !== movieId);
    },
    ADD_TO_CART(state, movie) {
      if (!state.cart.some((m) => m.id === movie.id)) {
        state.cart.push(movie);
      }
    },
    REMOVE_FROM_CART(state, movieId) {
      state.cart = state.cart.filter((m) => m.id !== movieId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_PURCHASE_STATUS(state, status) {
      state.purchaseStatus = status;
    },
  },

  actions: {
    async loadMovies({ commit }) {
      try {
        commit('SET_LOADING', true);
        const movies = await fetchPopularMovies();
        commit('SET_MOVIES', movies);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async searchMovies({ commit }, query) {
    try {
      commit('SET_LOADING', true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/search/movie`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query,
          language: 'pt-BR',
        },
      });
      commit('SET_MOVIES', data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      commit('SET_MOVIES', []);
    } finally {
      commit('SET_LOADING', false);
    }
  },

    toggleFavorite({ commit, getters }, movie) {
      if (getters.isFavorite(movie.id)) {
        commit('REMOVE_FROM_FAVORITES', movie.id);
      } else {
        commit('ADD_TO_FAVORITES', movie);
      }
    },

    toggleCart({ commit, getters }, movie) {
      if (getters.isInCart(movie.id)) {
        commit('REMOVE_FROM_CART', movie.id);
      } else {
        commit('ADD_TO_CART', movie);
      }
    },

    async finalizePurchase({ commit }) {
      commit('SET_PURCHASE_STATUS', null);
      commit('SET_LOADING', true);
      await new Promise((res) => setTimeout(res, 2000));
      commit('SET_LOADING', false);
      commit('CLEAR_CART');
      commit('SET_PURCHASE_STATUS', 'success');
    },
  },
});
