export default {
  namespaced: true,
  state: {
    modelName: 'Dragon 2.5_fbx.fbx',
    objReady: false,
  },
  mutations: {
    MODEL_NAME(state, name) {
      state.modelName = name;
    },
    OBJ_READY(state, ready) {
      state.objReady = ready;
    },
  },
};
