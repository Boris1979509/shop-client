import mutations from "@/store/mutations"
import LocalStorageDB from "@/plugins/localStorageDb";

const db = new LocalStorageDB('Cart');
const {
    FETCH_CART,
    ADD_TO_CART,
    UPDATE_CART_ITEM_QUANTITY_INCREMENT,
    UPDATE_CART_ITEM_QUANTITY,
    REMOVE_CART_INDEX,
    CLEAR_CART
} = mutations;

export default {
    namespaced: true,
    state: {
        cart: []
    },
    getters: {
        cart(state) {
            return state.cart;
        }
    },
    mutations: {
        [FETCH_CART](state, items) {
            state.cart = items;
        },
        [ADD_TO_CART](state, item) {
            state.cart.push(item);
        },
        [UPDATE_CART_ITEM_QUANTITY_INCREMENT](state, index) {
            state.cart[index].quantity++;
        },
        [UPDATE_CART_ITEM_QUANTITY](state, {index, quantity}) {
            state.cart[index].quantity = quantity;
        },
        [REMOVE_CART_INDEX](state, index) {
            state.cart.splice(index, 1);
        },
        [CLEAR_CART](state, cart) {
            state.cart = cart;
        }
    },
    actions: {
        // Init cart items
        initCartStore: {
            handler({dispatch}) {
                dispatch('fetchCart');
            },
            root: true,
        },
        async fetchCart({commit}) {
            const cartItems = await db.fetch('items'); // Get data localStorage
            if (cartItems) {
                commit(FETCH_CART, cartItems);
            }
        },
        async findCartItemIndexBySlug({state}, item) {
            return state.cart.findIndex(i => i.slug === item.slug);
        },
        async findCartItemByIndexFirst({getters}, index) {
            return getters.cart[index];
        },
        async addToCart({commit, dispatch, getters}, item) {
            try {
                const index = await dispatch("findCartItemIndexBySlug", item);

                if (index !== -1) { // if product item exist
                    commit(UPDATE_CART_ITEM_QUANTITY_INCREMENT, index);

                    if (!db.save('items', getters.cart)) { // Save localStorage
                        throw Error("The data was not saved to the storage.");
                    }

                    return await dispatch('findCartItemByIndexFirst', index);
                }

                item.quantity = 1;
                commit(ADD_TO_CART, item);

                if (!db.save('items', getters.cart)) { // Save localStorage
                    throw Error("The data was not saved to the storage.");
                }

                return await dispatch('findCartItemByIndexFirst',
                    await dispatch("findCartItemIndexBySlug", item));
            } catch (e) {
                console.log(e.message)
            }
        },
        removeCartIndex({commit, getters}, index) {
            commit(REMOVE_CART_INDEX, index);
            db.save('items', getters.cart); // Save localStorage
        },
        clearCart({commit}) {
            commit(CLEAR_CART, []);
            db.delete("items"); // Drop cart localStorage
        },
        updateCartItemQuantity({commit, getters}, data) {
            commit(UPDATE_CART_ITEM_QUANTITY, data);
            db.save('items', getters.cart); // Save localStorage
        }
    }
}
