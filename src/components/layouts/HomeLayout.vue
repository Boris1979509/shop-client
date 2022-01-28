<template>
  <app-navbar @toggle-sidebar="toggleSidebar">
    <nav-links />
  </app-navbar>
  <the-sidebar :is-active="isSidebarOpen" />
  <the-sidebar-mobile
    :is-active="isMobileSidebarOpen"
    @close="closeMobileSidebar"
  />
  <div :class="['pt-10 h-full', isSidebarOpen ? 'ml-64' : 'ml-0']">
    <app-breadcrumbs v-if="isShowBreadcrumbs" />
    <router-view />
  </div>
</template>

<script>
import { provide, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useSidebar } from "@/use/side-bar";
import TheSidebar from "@/components/sidebar/TheSidebar.vue";
import TheSidebarMobile from "@/components/sidebar/TheSidebarMobile.vue";
import NavLinks from "@/components/auth/NavLinks.vue";
import { useSetTitle } from "@/use/setTitle";

export default {
  name: "HomeLayout",
  components: { TheSidebar, TheSidebarMobile, NavLinks },
  setup() {
    useSetTitle();
    const store = useStore();
    const route = useRoute();
    provide("sidebar-list", store.getters["home/sidebar"]);

    const isShowBreadcrumbs = computed(() => route.path !== "/");

    return { ...useSidebar(), isShowBreadcrumbs };
  },
};
</script>
