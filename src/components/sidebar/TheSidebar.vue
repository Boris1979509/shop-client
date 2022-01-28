<template>
  <transition
    enter-active-class="transition ease-in-out duration-200 transform"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition ease-in-out duration-200 transform"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <div
      v-show="isActive"
      class="fixed xl:block pt-10 left-0 w-64 bg-white h-full border-r border-gray-200"
    >
      <div class="max-h-screen overflow-y-auto overflow-x-hidden flex-grow">
        <sidebar-content :sidebar="sidebar" />
      </div>
    </div>
  </transition>
</template>

<script>
import SidebarContent from "@/components/sidebar/SidebarContent.vue";

export default {
  name: "TheSidebar",
  props: {
    isActive: Boolean,
    sidebar: {
      type: Array,
    },
  },
  components: { SidebarContent },
};
</script>
