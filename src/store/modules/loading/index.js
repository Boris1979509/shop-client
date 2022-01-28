import mutations from "@/store/mutations"

const {START_LOADING, DONE_LOADING} = mutations;
export default {
    state: {
        isLoading: true
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        }
    },
    mutations: {
        [START_LOADING](state) {
            state.isLoading = true;
        },
        [DONE_LOADING](state) {
            state.isLoading = false;
        }
    },
    actions: {},
}
