<template>
  <div>
    <label
      v-if="label"
      :for="id ?? name"
      v-text="$t(label)"
      class="input-label"
    ></label>
    <div class="relative flex items-center">
      <input
        class="form-control"
        :type="type"
        :id="id ?? name"
        :name="name"
        :value="modelValue"
        @input="change"
        :class="{ 'is-invalid': errorMessage }"
        :placeholder="placeholder"
        ref="input"
      />
      <template v-if="isTypePassword">
        <app-icon
          :icon="icon"
          @click="switchVisibility"
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
      </template>
    </div>
    <div
      class="invalid-feedback"
      v-if="errorMessage"
      v-text="errorMessage"
    ></div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { usePasswordVisibility } from "@/use/password.visibility";
export default {
  name: "AppInput",
  emits: ["update:modelValue"],
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  setup(props, { emit }) {
    const { type } = toRefs(props);
    const change = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return { change, ...usePasswordVisibility(type) };
  },
};
</script>
