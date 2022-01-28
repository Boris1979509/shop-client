<template>
  <admin-navbar @toggle-sidebar="toggleSidebar" />
  <the-sidebar :sidebar="sidebar" :is-active="isSidebarOpen" />
  <the-sidebar-mobile
    :sidebar="sidebar"
    :is-active="isMobileSidebarOpen"
    @close="closeMobileSidebar"
  />
  <div :class="['py-10', isSidebarOpen ? 'md:ml-64' : 'md:ml-0']">
    <app-breadcrumbs v-if="isShowBreadcrumbs" />
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useSidebar } from "@/use/side-bar";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import TheSidebar from "@/components/sidebar/TheSidebar.vue";
import TheSidebarMobile from "@/components/sidebar/TheSidebarMobile.vue";

export default {
  name: "AdminLayout",
  setup() {
    const store = useStore();
    const route = useRoute();
    const sidebar = ref(null);
    const isShowBreadcrumbs = computed(() => route.path !== "/admin");

    onMounted(async () => {
      await store.dispatch("admin/setSidebar");
      sidebar.value = store.getters["admin/sidebar"];
    });

    return { ...useSidebar(), isShowBreadcrumbs, sidebar };
  },
  components: {
    TheSidebarMobile,
    AdminNavbar,
    TheSidebar,
  },
};
</script>
