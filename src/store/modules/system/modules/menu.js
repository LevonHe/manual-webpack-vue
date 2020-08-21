export default {
  namespaced: true,
  state: {
    aside: [],
  },
  mutations: {
    saveAside(state, aside) {
      state.aside = aside;
    },
  },
};
