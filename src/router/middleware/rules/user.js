import store from "@/store";

export default (to, from, next) => {
  store.getters["auth/isAuthenticated"] ? next() : next({ name: "auth.login" });
};
