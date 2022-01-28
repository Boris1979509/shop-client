import { computed } from "vue";
import router from "@/router";
import store from "@/store";

const useAuthRedirectAfterLogin = () => {
  const isAdmin = computed(() => store.getters["auth/isAdmin"]);
  store.watch(
    (_, getters) => getters["auth/user"],
    (value) => {
      if (value) {
        store.dispatch("auth/isAdmin");
        router.push({ name: isAdmin.value ? "admin" : "cabinet" });
      }
    }
  );
};
export { useAuthRedirectAfterLogin };
