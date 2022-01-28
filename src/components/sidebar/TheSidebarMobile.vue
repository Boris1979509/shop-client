<template>
  <transition
    enter-active-class="transition-opacity ease-linear duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <the-sidebar-mobile-overlay v-show="isActive" @click="$emit('close')" />
  </transition>
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
      class="fixed max-h-screen flex flex-col w-64 bg-white h-full z-40"
    >
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <div class="h-10 flex items-center px-4 sticky top-0 bg-white z-40">
          <app-button-menu @click.stop="$emit('close')" />
        </div>
        <sidebar-content :sidebar="sidebar" />
      </div>
    </div>
  </transition>
</template>

<script>
import TheSidebarMobileOverlay from "@/components/sidebar/TheSidebarMobileOverlay.vue";
import SidebarContent from "@/components/sidebar/SidebarContent.vue";

export default {
  name: "TheSidebarMobile",
  emits: ["close"],
  props: {
    isActive: Boolean,
    sidebar: {
      type: Array,
    },
  },
  components: { SidebarContent, TheSidebarMobileOverlay },
};
</script>
