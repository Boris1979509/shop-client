import { ref, reactive } from "vue";
import store from "@/store";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import phoneFormat from "@/helpers/phoneFormat";
import { useI18n } from "vue-i18n";

const useAuthLogin = () => {
  const isShowAgree = ref(false);
  const { t } = useI18n(); // translate
  const isButtonLoading = ref(false);
  const isCheckingCode = ref(false);
  const PHONE_PATTERN = /\+\d\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/g;
  const PASSWORD_MIN_LENGTH = 6;
  /** Default type by phone */
  const loginType = reactive({ type: "phone" });

  const validationSchema = yup.object().shape(
    {
      email: yup
        .string()
        .email()
        .when("phone", {
          is: (phone) => !phone || phone.length === 0,
          then: yup
            .string()
            .email(t("Incorrect email format"))
            .required(t("Required", { name: t("Email") })),
          otherwise: yup.string(),
        }),
      phone: yup.string().when("email", {
        is: (email) => !email || email.length === 0,
        then: yup
          .string()
          .required(t("Required", { name: t("Phone") }))
          .matches(PHONE_PATTERN, t("Incorrect phone format")),
        //otherwise: yup.string(),
      }),
      password: yup
        .string()
        .required(t("Required", { name: t("Password") }))
        .min(
          PASSWORD_MIN_LENGTH,
          t("Min", { name: t("Password"), min: PASSWORD_MIN_LENGTH })
        ),
    },
    [["email", "phone"], ["phone", "email"], ["email", "phone"], ["password"]]
  );
  const { errors, handleSubmit, resetForm } = useForm({
    validationSchema,
  });

  const { value: phone, resetField: resetPhone } = useField("phone");
  const { value: email, resetField: resetEmail } = useField("email");
  const { value: password } = useField("password");

  const selectTab = (value) => {
    if (value !== loginType.type) {
      loginType.type = value;
      /** Reset prev field */
      value === "phone" ? resetEmail() : resetPhone();
    }
  };
  /** Login */
  const onSubmit = handleSubmit(async (data, actions) => {
    if (loginType.type === "phone") {
      data = {
        ...loginType,
        phone: phoneFormat.toNumber(data.phone),
        password: data.password,
      };
    }
    if (loginType.type === "email") {
      data = {
        ...loginType,
        email: data.email,
        password: data.password,
      };
    }
    try {
      isButtonLoading.value = true;
      await store.dispatch("auth/login", data);
      resetForm();
    } catch ({ errors }) {
      actions.setErrors(errors);
    } finally {
      isButtonLoading.value = false;
    }
  });

  return {
    phone,
    email,
    password,
    errors,
    isButtonLoading,
    onSubmit,
    isCheckingCode,
    isShowAgree,
    selectTab,
  };
};
export { useAuthLogin };
