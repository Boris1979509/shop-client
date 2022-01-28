<template>
  <a
    href="#"
    class="transition duration-200 block px-3 py-1 hover:bg-gray-100"
    @click.prevent="logout"
    >{{ $t("Logout") }}</a
  >
</template>

<script>
import { useAuthLogout } from "@/use/auth/logout";
export default {
  name: "Logout",
  setup() {
    return {
      ...useAuthLogout(),
    };
  },
};
</script>
