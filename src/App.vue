<template>
  <component v-if="layout" :is="layout + '-layout'" />
  <teleport to="body">
    <transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <app-toast v-if="isToast" />
    </transition>
  </teleport>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import store from "@/store";
import HomeLayout from "@/components/layouts/HomeLayout.vue";
import AdminLayout from "@/components/layouts/AdminLayout.vue";

export default {
  name: "App",
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout);

    const isToast = computed(() => store.getters["isToast"]);

    return { layout, isToast };
  },
  components: {
    HomeLayout,
    AdminLayout,
  },
};
</script>
