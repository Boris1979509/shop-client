import { nextTick, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

export const useSetTitle = () => {
  const route = useRoute();
  const { t } = useI18n(); // translate

  const setTitle = async () => {
    await nextTick(() => {
      document.title = t(route.meta.title) ?? import.meta.env.VITE_APP_NAME;
    });
  };
  onMounted(() => {
    setTitle();
  });
  watch(route, () => {
    setTitle();
  });
};
