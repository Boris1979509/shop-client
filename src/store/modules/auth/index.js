import mutations from "@/store/mutations";
import api from "@/api";

const {
  SET_USER,
  REMOVE_USER,
  IS_PROGRESS_STATUS_AUTH,
  IS_AUTHENTICATED,
  IS_PROGRESS_STATUS_VERIFY,
  IS_ADMIN,
} = mutations;

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: sessionStorage.getItem("auth"),
    isProgressStatusAuth: false,
    isProgressStatusVerify: false,
    isAdmin: false,
  },
  getters: {
    isProgressStatusAuth: ({ isProgressStatusAuth }) => isProgressStatusAuth,
    isProgressStatusVerify: ({ isProgressStatusVerify }) =>
      isProgressStatusVerify,
    user: ({ user }) => user,
    isAuthenticated: ({ isAuthenticated }) => isAuthenticated,
    isAdmin: ({ isAdmin }) => isAdmin,
  },
  mutations: {
    [IS_PROGRESS_STATUS_AUTH](state, bool) {
      state.isProgressStatusAuth = bool;
    },
    [IS_PROGRESS_STATUS_VERIFY](state, bool) {
      state.isProgressStatusVerify = bool;
    },
    [IS_AUTHENTICATED](state, bool) {
      state.isAuthenticated = bool;
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [REMOVE_USER](state) {
      state.user = null;
    },
    [IS_ADMIN](state, bool) {
      state.isAdmin = bool;
    },
  },
  actions: {
    /** Logout */
    async logout({ dispatch, commit }) {
      const { message } = await api.logout();
      commit(REMOVE_USER);
      sessionStorage.removeItem("auth");
      /** Message notify */
      dispatch(
        "setNotify",
        {
          type: "success",
          message,
        },
        { root: true }
      );
    },
    /** Login  */
    async login({ dispatch, commit }, data) {
      const { message } = await api.login(data);
      sessionStorage.auth = true;
      commit(IS_AUTHENTICATED, true);
      await dispatch("getUser");
      /** Message notify */
      dispatch(
        "setNotify",
        {
          type: "success",
          message,
        },
        { root: true }
      );
    },
    /** Get user isAuthenticated */
    async getUser({ commit, getters }) {
      if (getters.user || !getters.isAuthenticated) return;
      const { user } = await api.getUser();
      commit(SET_USER, user);
    },
    /** Verify check */
    async check({}, data) {
      await api.check(data);
    },
    /** Register */
    async signup({ dispatch }, data) {
      const { seconds } = await api.signup(data);
      dispatch("setTimer", seconds, { root: true });
    },
    /** Is Admin */
    isAdmin({ commit, getters }) {
      if (getters.user) {
        const isRole = getters.user.roles.some((u) => u.name === "admin");
        commit(IS_ADMIN, isRole);
      }
    },
  },
};
