<template>
  <div class="relative grow">
    <div class="flex items-center">
      <div class="ml-auto">
        <div class="flex items-center">
          <button @click.stop="show = !show" class="flex focus:outline-none">
            <span v-if="label" v-text="label"></span>
            <app-icon :icon="icon" class="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <transition name="slide-in-right">
          <div
            class="right-0 top-full mt-2 bg-gray-50 rounded absolute z-10 shadow border border-gray-300 max-w-xs text-sm"
            v-show="show"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "AppDropdown",
  props: {
    icon: {
      type: String,
      default: "chevron-down",
    },
    label: {
      type: String,
    },
  },
  setup() {
    const show = ref(false);

    /** Close dropdown outer element */
    const close = () => {
      show.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", close);
    });

    return { show };
  },
};
</script>
