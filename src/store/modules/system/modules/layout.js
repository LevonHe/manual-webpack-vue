export default {
  namespaced: true,
  state: {
    asideCollapse: false,
    isFullscreen: false,
  },
  mutations: {
    saveAsideCollapse(state, asideCollapse) {
      state.asideCollapse = asideCollapse;
    },
    IS_FULL_SCREEN(state, fullscreen) {
      state.isFullscreen = fullscreen;
    },
  },
};
