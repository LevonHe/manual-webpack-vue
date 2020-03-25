export default {
  namespaced: true,
  state: {
    userInfo: {},
    permission: {},
    permissionNameArr: [],
  },
  mutations: {
    USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    PERMISSION(state, permission) {
      state.permission = permission;
    },
    PERMISSION_NAME_ARR(state, permissionNameArr) {
      state.permissionNameArr = permissionNameArr;
    },
  },
};
