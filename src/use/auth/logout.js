import store from "@/store";
import router from "@/router";

const useAuthLogout = () => {
  const logout = async () => {
    try {
      await store.dispatch("auth/logout");
      router.push({ name: "auth.login" });
    } catch (error) {
      console.log(error);
    }
  };
  return { logout };
};
export { useAuthLogout };
