<template>
  <app-loader v-if="loader" />
  <template v-else>
    <div class="text-sm text-center mb-3">
      <p class="pb-2" v-html="$t('Code was sent to the number', { name })"></p>
      <p>{{ $t("Information by code") }}</p>
    </div>
    <app-code-input
      v-if="isCodeInput"
      :error-message="errorMessage"
      :is-progress-status-verify="isProgressStatusVerify"
      @code="checkingCode"
      @reset-error="errorMessage = null"
    />
    <template v-else>
      <app-alert type="error">{{ $t("An error has occurred") }}</app-alert>
    </template>
    <div class="flex flex-col text-sm text-center mt-3">
      <template v-if="timerStatus">
        <app-timer @timesUp="timesUp" :time-limit="timeLimit" />
      </template>
      <template v-else>
        <a href="#" @click.prevent="requestCode">{{
          $t("Send the code again")
        }}</a>
      </template>
      <a href="#" @click.prevent="$emit('addNewPhone')">{{
        $t("Add new phone")
      }}</a>
    </div>
    <app-checkbox-input v-model="agree" name="agree" class="text-center mt-3">
      {{ $t("Agree") }}
    </app-checkbox-input>
  </template>
</template>

<script>
import { toRefs } from "vue";
import { useCheckingCode } from "@/use/auth/checkingCode";
import { useAuthRedirectAfterLogin } from "@/use/auth/redirectAfterLogin";
import AppCodeInput from "@/components/ui/AppCodeInput.vue";
import AppTimer from "@/components/ui/AppTimer.vue";
import phoneFormat from "@/helpers/phoneFormat";

export default {
  name: "CheckingCode",
  emits: ["addNewPhone"],
  props: {
    phone: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    useAuthRedirectAfterLogin();
    const { phone } = toRefs(props);
    const name = `<span class="font-semibold">${phone.value}</span>`;
    return {
      name,
      ...useCheckingCode(phoneFormat.toNumber(phone.value)),
    };
  },
  components: {
    AppCodeInput,
    AppTimer,
  },
};
</script>
