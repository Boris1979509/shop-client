import { onMounted, ref, computed } from "vue";

export const usePasswordVisibility = (type) => {
  const input = ref(null);
  const switchType = ref("");

  onMounted(() => {
    switchType.value = type.value;
  });

  const isTypePassword = computed(() => type.value === "password");

  const icon = computed(() =>
    switchType.value === "password" ? "eye" : "eye-off"
  );

  const switchVisibility = () => {
    switchType.value = switchType.value === "password" ? "text" : "password";
    input.value.type = switchType.value;
  };
  return {
    isTypePassword,
    icon,
    input,
    switchVisibility,
  };
};
