<template>
  <div>
    <ul class="nav nav-tabs md:flex flex-row" role="tablist">
      <li class="nav-item" v-for="(tab, i) in tabs">
        <a
          @click.prevent="selectTab(i)"
          class="nav-link"
          :class="i === selectedIndex && 'active'"
          href="#"
          :key="i"
          role="tab"
          >{{ tab.props.title }}</a
        >
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane active" ref="childs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  provide,
  reactive,
  toRefs,
} from "vue";

export default {
  name: "Tabs",
  emits: ["select-tab"],
  setup(_, { slots, emit }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [],
      count: 0,
    });

    provide("TabsProvider", state);

    const selectTab = (i) => {
      state.selectedIndex = i;
      emit("select-tab", state.tabs[i].props.value);
    };

    const update = () => {
      if (slots.default) {
        state.tabs = slots
          .default()
          .filter((child) => child.type.name === "AppTab");
      }
    };

    onBeforeMount(() => update());
    onBeforeUpdate(() => update());

    onMounted(() => {
      selectTab(0);
    });

    return { ...toRefs(state), selectTab };
  },
};
</script>
