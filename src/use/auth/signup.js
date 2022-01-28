import { ref, computed } from "vue";
import store from "@/store";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import phoneFormat from "@/helpers/phoneFormat";
import { useI18n } from "vue-i18n";

export const useAuthSignup = () => {
  const { t } = useI18n(); // translate
  const isButtonLoading = ref(false);
  const PHONE_PATTERN = /\+\d\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/g;
  const isCheckingCode = computed(() => !!store.getters["seconds"]);

  const validationSchema = yup.object({
    phone: yup
      .string()
      .required(t("Required", { name: t("Phone") }))
      .matches(PHONE_PATTERN, t("Incorrect phone format")),
  });
  const { errors, handleSubmit } = useForm({
    validationSchema,
  });

  const { value: phone, resetField } = useField("phone");

  /** Request signup code */
  const requestCode = async (data) => {
    await store.dispatch("auth/signup", data);
  };

  const onSubmit = handleSubmit(async (data, actions) => {
    try {
      isButtonLoading.value = true;
      /** Formatted phone  */
      data.phone = phoneFormat.toNumber(data.phone);
      await requestCode(data);
    } catch ({ errors, error }) {
      actions.setErrors(errors || { phone: error });
    } finally {
      isButtonLoading.value = false;
    }
  });

  /** Add new phone */
  const addNewPhone = () => {
    store.dispatch("clearTimer");
    resetField();
  };

  return {
    phone,
    errors,
    isButtonLoading,
    onSubmit,
    isCheckingCode,
    addNewPhone,
  };
};
