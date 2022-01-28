<template>
  <div>
    <input
      type="checkbox"
      :id="name"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="name" class="ml-2 -mt-1 text-sm leading-tight">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "AppCheckboxInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: Boolean,
    name: String,
  },
};
</script>
