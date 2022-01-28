<template>
  <button
    @click="close"
    class="
      inline-flex
      items-center
      justify-center
      w-6
      h-6
      p-1
      rounded-full
      group
      hover:bg-gray-200
      transition-colors
      duration-300
      focus:outline-none focus:bg-gray-200
      bg-gray-100
      shrink-0
    "
  >
    <app-icon
      icon="x"
      class="
        text-gray-500
        transition-colors
        duration-300
        group-hover:text-gray-800
      "
    />
  </button>
</template>

<script>
export default {
  name: "AppButtonClose",
  emits: ["close"],
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
};
</script>
