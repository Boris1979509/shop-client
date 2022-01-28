import mutations from "@/store/mutations";
import repository from "@/api/repository";

const {
    SET_USERS,
    SET_USER,
    SET_IS_UPDATE_USERS,
    SET_SIDEBAR,
    SET_CATEGORIES,
    SET_PARENT_CATEGORIES,
    SET_PRODUCTS,
    SET_PRODUCT
} = mutations;

export default {
    namespaced: true,
    state: {
        sidebar: null,
        users: null,
        isUpdateUsers: false,
        user: null,
        categories: null,
        parentCategories: null,
        products: null,
        product: null
    },
    getters: {
        sidebar(state) {
            return state.sidebar;
        },
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
        isUpdateUsers(state) {
            return state.isUpdateUsers;
        },
        categories(state) {
            return state.categories;
        },
        parentCategories(state) {
            return state.parentCategories;
        },
        products(state) {
            return state.products;
        },
        product(state) {
            return state.product;
        }
    },
    mutations: {
        [SET_USERS](state, users) {
            state.users = users;
        },
        [SET_USER](state, user) {
            state.user = user;
        },
        [SET_IS_UPDATE_USERS](state, value) {
            state.isUpdateUsers = value;
        },
        [SET_SIDEBAR](state, data) {
            state.sidebar = data;
        },
        [SET_CATEGORIES](state, data) {
            state.categories = data;
        },
        [SET_PARENT_CATEGORIES](state, data) {
            state.parentCategories = data;
        },
        [SET_PRODUCTS](state, data) {
            state.products = data;
        },
        [SET_PRODUCT](state, data) {
            state.product = data;
        }
    },
    actions: {
        async setUsers({commit}, {page, data}) {
            commit(SET_USERS, null); // by loader
            let config = {};
            if (data) {
                config = { // config fetch
                    method: 'get',
                    params: {...data}
                };
            }
            const {errors, response} = await repository.users(page, config);
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_USERS, response);
        },
        async setUser({commit}, id) {
            const {errors, response} = await repository.showUser(id);
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_USER, response);
        },
        async setSidebar({commit}) {
            const {errors, response} = await repository.sidebar();
            if (errors) {
                console.log(errors);
                return;
            }
            const sidebar = [
                {
                    label: 'Admin',
                    icon: 'home',
                    route: 'admin'
                },
                {
                    label: 'Users',
                    icon: 'users',
                    route: 'admin.users',
                    count: response.users.count
                },
                {
                    label: 'Products',
                    icon: 'database',
                    route: 'admin.products',
                    count: response.products.count
                },
                {
                    label: 'Categories',
                    icon: 'collection',
                    route: 'admin.products.categories',
                    count: response.categories.count
                }
            ];
            commit(SET_SIDEBAR, sidebar);
        },
        async setCategories({commit, dispatch}, {page, data}) {
            commit(SET_CATEGORIES, null); // by loader
            let config = {};
            if (data) {
                config = { // config fetch
                    method: 'get',
                    params: {...data}
                };
            }
            const {errors, response} = await repository.getProductCategories(page, config);
            if (errors) {
                console.log(errors);
                return;
            }
            dispatch("setCategoriesResponseData", response);
        },
        async setParentCategories({commit}) {
            const {errors, response} = await repository.getParentCategories();
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_PARENT_CATEGORIES, response);
        },
        async setCategoriesResponseData({commit}, {categories, parents}) {
            commit(SET_CATEGORIES, categories ?? null);
            commit(SET_PARENT_CATEGORIES, parents ?? null);
        },
        async setProducts({commit}, {page, data}) {
            commit(SET_PRODUCTS, null); // by loader
            let config = {};
            if (data) {
                config = { // config fetch
                    method: 'get',
                    params: {...data}
                };
            }
            const {errors, response} = await repository.getProductsAdmin(page, config);
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_PRODUCTS, response);
        },

        async getProduct({commit, getters}, id) {
            commit(SET_PRODUCT, null);
            const {errors, response} = await repository.getProductForAdmin(id);
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_PRODUCT, response);
        }
    }
}
