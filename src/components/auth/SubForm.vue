<template>
  <div class="flex items-center flex-wrap justify-around">
    <register-link @registration="$emit('registration')" />
    <password-reset-link @password-reset="$emit('password-reset')" />
  </div>
  <!-- Button component -->
  <app-button
    color="success"
    class="w-full"
    :isButtonLoading="isButtonLoading"
    type="submit"
    >{{ $t("Signin") }}
  </app-button>
  <!---->
</template>

<script>
import RegisterLink from "@/components/auth/RegisterLink.vue";
import PasswordResetLink from "@/components/auth/PasswordResetLink.vue";

export default {
  name: "SubForm",
  emits: ["registration", "password-reset"],
  props: {
    isButtonLoading: Boolean,
  },
  components: {
    RegisterLink,
    PasswordResetLink,
  },
};
</script>
