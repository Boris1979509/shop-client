<template>
  <nav class="fixed bg-white border-b inset-x-0 z-10">
    <div class="mx-auto px-1 sm:px-4 lg:px-4">
      <div class="flex items-center justify-between h-10">
        <div class="flex items-center">
          <app-button-menu @click="openMobileSidebar" />
        </div>
        <nav-links />
      </div>
    </div>
  </nav>
</template>
<script>
import NavLinks from "@/components/auth/NavLinks.vue";

export default {
  name: "AdminNavbar",
  emits: ["toggle-sidebar"],
  setup(_, { emit }) {
    const openMobileSidebar = () => {
      emit("toggle-sidebar");
    };
    return { openMobileSidebar };
  },
  components: {
    NavLinks,
  },
};
</script>
