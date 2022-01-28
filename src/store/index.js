import { createStore } from "vuex";
import products from "@/store/modules/products";
import cart from "@/store/modules/cart";
import order from "@/store/modules/order";
import notifications from "@/store/modules/notifications";
import auth from "@/store/modules/auth";
import admin from "@/store/modules/admin";
import cabinet from "@/store/modules/cabinet";
import home from "@/store/modules/home";
import loading from "@/store/modules/loading";
import timer from "@/store/modules/timer";

const store = createStore({
  modules: {
    products,
    cart,
    order,
    notifications,
    auth,
    admin,
    cabinet,
    home,
    loading,
    timer,
  },
});
await store.dispatch("auth/getUser");
await store.dispatch("auth/isAdmin");
store.dispatch("initCartStore").then(() => {
  console.log("Init app");
});

export default store;
