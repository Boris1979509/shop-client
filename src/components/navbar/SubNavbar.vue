<template>
  <div class="bg-gray-900">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="h-8 relative flex justify-end items-center">
        <nav-links />
      </div>
    </div>
  </div>
</template>

<script>
import NavLinks from "@/components/auth/NavLinks.vue";

export default {
  name: "SubNavbar",
  components: {
    NavLinks,
  },
};
</script>

<style scoped></style>
