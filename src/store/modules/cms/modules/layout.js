export default {
  namespaced: true,
  state: {
    collapsed: false,
  },
  mutations: {
    COLLAPSED(state, collapsed) {
      state.collapsed = collapsed;
    },
  },
};
