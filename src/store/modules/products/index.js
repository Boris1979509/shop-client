import mutations from "@/store/mutations"
import repository from "@/api/repository";

const {
    UPDATE_PRODUCTS,
    SET_PRODUCTS,
    SET_PRODUCT
} = mutations;
export default {
    namespaced: true,
    state: {
        products: [],
        product: null
    },
    getters: {
        products(state) {
            return state.products;
        },
        product(state) {
            return state.product;
        }
    },
    mutations: {
        [UPDATE_PRODUCTS](state, products) {
            state.products = products;
        },
        [SET_PRODUCTS](state, products) {
            state.products = products;
        },
        [SET_PRODUCT](state, product) {
            state.product = product;
        }
    },
    actions: {
        /**
         * Get all products
         * @param commit
         * @param dispatch
         * @param page
         * @returns {Promise<void>}
         */
        async fetchProducts({commit, dispatch}, page) {
            const {errors, response} = await repository.getProducts(page);
            if (errors) {
                console.log(errors);
                return;
            }
            commit(SET_PRODUCTS, response);
        },
        /**
         * Find product by slug
         * @param commit
         * @param dispatch
         * @param slug
         * @returns {Promise<void>}
         */
        async find({commit, dispatch}, slug) {
            const {response} = await repository.getProductBySlug(slug);
            commit(SET_PRODUCT, response);
        }
    }
}
