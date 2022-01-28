<template>
  <ul class="flex flex-col py-4 border-t space-y-1">
    <sidebar-nav-item
      v-for="(item, idx) in sidebar"
      :key="idx"
      :icon="item.icon"
      :label="item.label"
      :route-name="item.route"
      :count="item?.count"
    />
  </ul>
</template>

<script>
import SidebarNavItem from "@/components/sidebar/SidebarNavItem.vue";

export default {
  name: "SidebarContent",
  props: {
    sidebar: Array,
  },
  components: {
    SidebarNavItem,
  },
};
</script>
