<template>
  <a
    class="hover:underline text-md font-semibold"
    @click.prevent="$emit('registration')"
    href="#"
    >{{ $t("Signup") }}
  </a>
</template>

<script>
export default {
  name: "RegisterLink",
  emits: ["registration"],
};
</script>
