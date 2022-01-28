<template>
  <template v-if="user">
    <app-dropdown icon="dots-vertical" :label="user.phone">
      <cabinet-dropdown-items />
    </app-dropdown>
  </template>
  <template v-else>
    <div class="ml-auto">
      <div class="flex items-center">
        <app-icon icon="login" class="h-5 w-5" />
        <router-link class="hover:underline ml-1" :to="{ name: 'auth.login' }"
          >{{ $t("Signin") }}
        </router-link>
      </div>
    </div>
  </template>
</template>

<script>
import { computed } from "vue";
import store from "@/store";
import CabinetDropdownItems from "@/components/cabinet/CabinetDropdownItems.vue";

export default {
  name: "NavLinks",
  setup() {
    const user = computed(() => store.getters["auth/user"]);
    return {
      user,
    };
  },
  components: {
    CabinetDropdownItems,
  },
};
</script>
