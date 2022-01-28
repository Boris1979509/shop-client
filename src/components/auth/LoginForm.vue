<template>
  <div class="container">
    <div class="flex justify-center">
      <div class="auth-container">
        <h2>{{ $t("Login") }}</h2>

        <!-- Checking Code -->
        <checking-code
          v-if="isCheckingCode"
          :phone="phone"
          :isShowAgree="isShowAgree"
          @on-is-authorize="isCheckingCode = false"
        />
        <!---->
        <form v-else @submit.prevent="onSubmit" novalidate>
          <div class="space-y-3">
            <!-- Tabs -->
            <app-tabs @selectTab="selectTab">
              <app-tab :title="$t('Phone')" value="phone">
                <app-phone-input
                  :error-message="errors.phone"
                  v-model="phone"
                />
              </app-tab>
              <app-tab :title="$t('Email')" value="email">
                <app-input
                  type="email"
                  name="email"
                  label="Email"
                  :error-message="errors.email"
                  v-model.trim="email"
                />
              </app-tab>
            </app-tabs>
            <!---->
            <!-- Password input component -->
            <app-input
              type="password"
              name="password"
              label="Password"
              :error-message="errors.password"
              v-model.trim="password"
            />
          </div>
          <div class="mt-6">
            <!-- Button component -->
            <app-button
              color="primary"
              class="w-full"
              :isButtonLoading="isButtonLoading"
              type="submit"
              >{{ $t("Signin") }}
            </app-button>
            <!---->
          </div>
        </form>
        <div class="auth-links">
          <router-link
            :to="{ name: 'auth.signup' }"
            v-text="$t('Signup')"
          ></router-link>
          <router-link
            :to="{ name: 'auth.forgot' }"
            v-text="$t('Forgot')"
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckingCode from "@/components/auth/CheckingCode.vue";
import { useAuthLogin } from "@/use/auth/login";
import { useAuthRedirectAfterLogin } from "@/use/auth/redirectAfterLogin";
import AppTabs from "@/components/ui/AppTabs.vue";
import AppTab from "@/components/ui/AppTab.vue";

export default {
  name: "LoginForm",
  setup() {
    useAuthRedirectAfterLogin();
    return { ...useAuthLogin() };
  },
  components: {
    CheckingCode,
    AppTabs,
    AppTab,
  },
};
</script>
