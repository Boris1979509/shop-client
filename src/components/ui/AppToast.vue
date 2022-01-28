<template>
  <div class="toast-wrap">
    <div class="toast">
      <div
        :class="['toast-' + toast.type]"
        class="flex items-center justify-center w-12"
      >
        <app-icon :icon="toast.icon" class="h-6 w-6 text-white" />
      </div>

      <div class="toast-body">
        <div class="mx-3">
          <span
            :class="['toast-title-' + toast.type]"
            class="font-semibold"
            v-text="$t(toast.title)"
          ></span>
          <p v-text="toast.message"></p>
        </div>
      </div>
      <app-button-close @click="close" class="mr-2 mt-2" />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { computed } from "vue";

export default {
  name: "AppToast",
  setup() {
    const toastMap = {
      error: {
        title: "Alert label error",
        icon: "exclamation-circle",
      },
      success: {
        title: "Alert label success",
        icon: "check",
      },
      info: {
        title: "Alert label info",
        icon: "information-circle",
      },
      warning: {
        title: "Alert label warning",
        icon: "information-circle",
      },
    };

    const data = computed(() => store.getters["message"]);
    const toast = computed(() =>
      data.value
        ? {
            ...toastMap[data.value.type],
            message: data.value.message,
            type: data.value.type,
          }
        : null
    );
    const close = () => {
      store.dispatch("clearNotify");
    };

    return {
      close,
      toast,
    };
  },
};
</script>
