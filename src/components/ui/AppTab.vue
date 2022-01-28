<template>
  <div class="tab" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
import { onBeforeMount, ref, inject, watch } from "vue";

export default {
  name: "AppTab",
  setup() {
    const index = ref(0);
    const isActive = ref(false);

    const tabs = inject("TabsProvider");

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = index.value === tabs.selectedIndex;
      }
    );

    onBeforeMount(() => {
      index.value = tabs.count;
      tabs.count++;
      isActive.value = index.value === tabs.selectedIndex;
    });
    return { index, isActive };
  },
};
</script>
