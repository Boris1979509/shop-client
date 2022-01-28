<template>
  <ul class="list-none overflow-hidden py-2">
    <li>
      <router-link
        class="transition duration-200 block px-3 py-1 hover:bg-gray-100"
        :to="{ name: 'cabinet' }"
        >{{ $t("Cabinet") }}</router-link
      >
    </li>
    <li>
      <Logout />
    </li>
  </ul>
</template>

<script>
import Logout from "@/components/auth/Logout.vue";
export default {
  components: {
    Logout,
  },
};
</script>
