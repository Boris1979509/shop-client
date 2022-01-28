import mutations from "@/store/mutations";

const { SET_TIMER, CLEAR_TIMER } = mutations;
export default {
  state: {
    seconds: 0,
  },
  getters: {
    seconds: ({ seconds }) => seconds,
  },
  mutations: {
    [SET_TIMER](state, value) {
      state.seconds = value;
    },
    [CLEAR_TIMER](state, value) {
      state.seconds = value;
    },
  },
  actions: {
    setTimer({ commit }, seconds) {
      commit(SET_TIMER, seconds);
    },
    clearTimer({ commit }) {
      commit(CLEAR_TIMER, 0);
    },
  },
};
