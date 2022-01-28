import mutations from "@/store/mutations";

const {} = mutations;

export default {
    namespaced: true,
    state: {
        sidebar: [
            {
                label: 'Products',
                icon: 'database',
                routeName: 'products'
            },
            {
                label: 'Feedback',
                icon: 'inbox',
                routeName: 'feedback'
            }
        ],
    },
    getters: {
        sidebar(state) {
            return state.sidebar;
        },

    },
    mutations: {},
    actions: {}
}
