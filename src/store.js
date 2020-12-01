import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
    userIsLogged: (state) => state.user != null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    getLoggedUser: ({ commit }) => {
      Vue.http
        .get('/getLoggedUser')
        .then((r) => commit('setUser', r.data))
        .catch(() => commit('setUser', null));
    },
  },
});
