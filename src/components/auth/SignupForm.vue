<template>
  <div class="container">
    <div class="flex justify-center">
      <div class="auth-container">
        <h2>{{ $t("Signup") }}</h2>
        <!-- Checking Code -->
        <checking-code
          v-if="isCheckingCode"
          :phone="phone"
          @addNewPhone="addNewPhone"
        />
        <!---->
        <template v-else>
          <form @submit.prevent="onSubmit" class="space-y-5" novalidate>
            <app-phone-input :error-message="errors.phone" v-model="phone" />
            <app-button
              color="primary"
              class="w-full"
              :isButtonLoading="isButtonLoading"
              type="submit"
              >{{ $t("Signup") }}
            </app-button>
          </form>
          <div class="auth-links">
            <router-link
              :to="{ name: 'auth.login' }"
              v-text="$t('Signin')"
            ></router-link>
            <router-link
              :to="{ name: 'auth.forgot' }"
              v-text="$t('Forgot')"
            ></router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CheckingCode from "@/components/auth/CheckingCode.vue";
import { useAuthSignup } from "@/use/auth/signup";

export default {
  name: "SignupForm",
  setup() {
    return { ...useAuthSignup() };
  },
  components: {
    CheckingCode,
  },
};
</script>
