import mutations from "@/store/mutations"

const {UPDATE_ORDER} = mutations;
export default {
    state: {
        order: []
    },
    getters: {
        order(state) {
            return state.order;
        }
    },
    mutations: {
        [UPDATE_ORDER](state, order) {
            state.order = order;
        }
    },
    actions: {},
}
