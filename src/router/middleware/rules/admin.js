import store from "@/store";

export default (to, from, next) => {
  store.getters["auth/isAuthenticated"] && store.getters["auth/isAdmin"]
    ? next()
    : next({ name: "auth.login" });
};
