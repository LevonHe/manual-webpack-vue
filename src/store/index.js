import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import cms from './modules/cms';

const isDev = process.env.NODE_ENV === 'development';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: isDev,
  modules: {
    cms,
  },
  plugins: [createPersistedState()],
});
