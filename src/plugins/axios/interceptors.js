import store from "@/store";
import router from "@/router";

export default function (axios) {
  axios.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      if (error.response.status === 401) {
        store.dispatch("auth/logout");
        await router.push({ name: "auth.login" });
      } else if (error.response.status === 404) {
        await router.push({ name: "notFound" });
      }
      return Promise.reject(error.response.data);
    }
  );
}
