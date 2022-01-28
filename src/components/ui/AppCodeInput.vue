<template>
  <div>
    <div class="flex justify-center items-center gap-1">
      <div v-for="(_, idx) in codeLength" :key="idx">
        <input
          :ref="
            (el) => {
              inputs[idx] = el;
            }
          "
          v-model.number="code[idx]"
          @keyup.delete="clear(idx)"
          @input="setNextElFocus($event.target.value, idx + 1)"
          :class="[
            errorMessage ? 'is-invalid' : '',
            isProgressStatusVerify ? 'opacity-50' : '',
          ]"
          type="text"
          class="form-control text-center text-lg p-1 font-bold max-w-[30px]"
          maxlength="1"
        />
      </div>
    </div>
    <div
      class="invalid-feedback text-center"
      v-if="errorMessage"
      v-text="errorMessage"
    ></div>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from "vue";

export default {
  name: "AppCodeInput",
  emits: ["code", "reset-error"],
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    codeLength: {
      type: Number,
      default: 6,
    },
    isProgressStatusVerify: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const inputs = ref([]);
    const code = reactive([]);
    const isEvent = ref(true);

    /**
     * Set next element focus
     * @param value
     * @param idx
     */
    const setNextElFocus = (value, idx) => {
      const regexp = /^(\d)$/;
      if (props.errorMessage) emit("reset-error");
      if (inputs.value.length > idx) {
        if (!regexp.test(value)) {
          delete code[idx - 1];
        } else {
          if (isEvent.value) inputs.value[idx].focus();
        }
      }
    };
    /**
     * Clear value input and set focus
     * @param idx
     */
    const clear = (idx) => {
      if (props.errorMessage) emit("reset-error");
      if (idx > 0) {
        isEvent.value = false;
        delete code[idx];
        inputs.value[idx - 1].focus();
      } else {
        isEvent.value = true;
      }
    };
    /**
     * Converted array keys to string
     * @param value
     */
    const formatCode = (value) => {
      emit("code", value.join(""));
    };

    const result = computed(() => {
      return code.filter((item) => item !== "");
    });

    onMounted(() => {
      if (props.errorMessage) emit("reset-error"); // Clear errors
    });

    watch(
      code,
      (value) => {
        if (result.value.length === props.codeLength) {
          formatCode(value);
        }
      },
      { deep: true }
    );
    /** watch check verify status */
    watch(
      () => props.isProgressStatusVerify,
      (value) => inputs.value.forEach((item) => (item.disabled = value))
    );
    return { inputs, code, setNextElFocus, clear };
  },
};
</script>
