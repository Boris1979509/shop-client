import mutations from "@/store/mutations";

const { SET_NOTIFY, IS_TOAST, CLEAR_NOTIFY } = mutations;

export default {
  state: {
    messagePool: [],
    isToast: false,
  },
  getters: {
    message: ({ messagePool }) => messagePool[messagePool.length - 1], // last message
    isToast: ({ isToast }) => isToast,
  },
  mutations: {
    [SET_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    },
    [CLEAR_NOTIFY](state) {
      state.message = [];
    },
    [IS_TOAST](state, bool) {
      state.isToast = bool;
    },
  },
  actions: {
    setNotify({ commit, dispatch }, msg) {
      setTimeout(() => {
        commit("IS_TOAST", true);
        commit("SET_NOTIFY", msg);
        dispatch("clearNotify", 5000);
      }, 1000);
    },
    clearNotify({ commit }, ttl = 0) {
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        commit("IS_TOAST", false);
        commit("CLEAR_NOTIFY");
      }, ttl);
    },
  },
};
