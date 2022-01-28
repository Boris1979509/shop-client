import { computed, ref } from "vue";
import store from "@/store";

const useCheckingCode = (phone) => {
  const timeLimit = computed(() => store.getters["seconds"]);
  const isProgressStatusVerify = computed(
    () => store.getters["auth/isProgressStatusVerify"]
  );
  const timerStatus = ref(true);
  const isCodeInput = ref(true);
  const loader = ref(false);
  const errorMessage = ref(null);
  const agree = ref(true);

  /** Request code */
  const requestCode = async () => {
    try {
      loader.value = true;
      isCodeInput.value = timerStatus.value = false;
      await store.dispatch("auth/signup", {
        phone,
      });
    } catch ({ errors }) {
      console.log(errors);
    } finally {
      loader.value = false;
      isCodeInput.value = timerStatus.value = true;
    }
  };
  /** Verify token */
  const checkingCode = async (phone_verify_token) => {
    if (!timerStatus.value || !agree.value) return; /** if times up return */
    try {
      store.commit("auth/IS_PROGRESS_STATUS_VERIFY", true);
      await store.dispatch("auth/check", { phone, phone_verify_token });
      await store.dispatch("auth/login", {
        phone,
        type: "phone",
        password: phone_verify_token,
      });
    } catch ({ errors }) {
      errorMessage.value = errors.phone_verify_token[0];
    } finally {
      store.commit("auth/IS_PROGRESS_STATUS_VERIFY", false);
    }
  };

  /** Times up */
  const timesUp = () => (timerStatus.value = false);

  return {
    agree,
    errorMessage,
    checkingCode,
    isCodeInput,
    loader,
    timeLimit,
    timerStatus,
    requestCode,
    timesUp,
    isProgressStatusVerify,
  };
};

export { useCheckingCode };
