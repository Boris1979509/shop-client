<template>
  <div>
    <label for="phone" class="input-label">{{ $t("Phone") }}</label>
    <div class="relative flex items-center">
      <input
        class="form-control"
        type="tel"
        ref="maskElement"
        id="phone"
        name="phone"
        :value="modelValue"
        @input="change"
        :class="{ 'is-invalid': errorMessage }"
      />
      <app-icon
        icon="x"
        @click="$emit('update:modelValue', undefined)"
        class="
          absolute
          right-3
          w-5
          h-5
          cursor-pointer
          transition
          duration-200
          ease-in-out
          text-gray-300
          hover:text-gray-600
        "
      />
    </div>
    <div
      class="invalid-feedback"
      v-if="errorMessage"
      v-text="errorMessage"
    ></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Inputmask from "inputmask";

export default {
  name: "AppPhoneInput",
  emits: ["update:modelValue"],
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    modelValue: [String, Number],
  },
  setup(_, { emit }) {
    const maskElement = ref(null);
    onMounted(() => {
      bindPhoneMask(maskElement.value);
    });
    const change = (event) => {
      emit("update:modelValue", event.target.value);
    };

    const bindPhoneMask = (
      inputElement,
      regexMask = null,
      placeholder = null
    ) => {
      if (!regexMask)
        regexMask = "^\\+7 \\([3489]\\d\\d\\) \\d\\d\\d \\d\\d \\d\\d$";
      if (!placeholder) placeholder = "+7 (___) ___ __ __";

      Inputmask({
        regex: regexMask,
        placeholder: placeholder,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        postValidation(buffer) {
          let nums = buffer.join("").replace(/[^0-9]+/g, "");
          let hasSevenNumbersInARow = /(\d)\1{6}/g.test(nums);
          return !hasSevenNumbersInARow;
        },
      }).mask(inputElement);
    };

    return { change, maskElement };
  },
};
</script>
