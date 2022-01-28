<template>
  <sub-navbar />
  <nav
    v-scroll="handleScroll"
    :class="{ 'fixed top-0': isScroll }"
    class="bg-gray-800 inset-x-0 z-10"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            @click="toggleHamburger = !toggleHamburger"
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:bg-gray-700
            "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <app-icon v-if="toggleHamburger" icon="x" class="block h-6 w-6" />
            <app-icon v-else icon="menu" class="block h-6 w-6" />
          </button>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="
                  bg-gray-900
                  text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                "
              >
                Home
              </router-link>
              <a
                href="#"
                class="
                  text-gray-300
                  hover:bg-gray-700 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                "
                >Team</a
              >

              <a
                href="#"
                class="
                  text-gray-300
                  hover:bg-gray-700 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                "
                >Projects</a
              >

              <a
                href="#"
                class="
                  text-gray-300
                  hover:bg-gray-700 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                "
                >Calendar</a
              >
            </div>
          </div>
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
        >
          <button
            @click="goPage('order.checkout')"
            class="
              flex
              bg-gray-800
              p-1
              rounded-lg
              text-gray-400
              hover:text-gray-100
              focus:outline-none focus:bg-gray-700
            "
          >
            <span class="sr-only">Shopping cart</span>
            <app-icon icon="shopping-bag" class="h-6 w-6" />
            <span class="text-xs text-gray-100 font-bold"
              >({{ cart.length }})</span
            >
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      :class="{ hidden: !toggleHamburger }"
      class="sm:hidden"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#"
          class="
            bg-gray-900
            text-white
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
          "
          aria-current="page"
          >Dashboard</a
        >
        <a
          href="#"
          class="
            text-gray-300
            hover:bg-gray-700 hover:text-white
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
          "
          >Team</a
        >
        <a
          href="#"
          class="
            text-gray-300
            hover:bg-gray-700 hover:text-white
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
          "
          >Projects</a
        >
        <a
          href="#"
          class="
            text-gray-300
            hover:bg-gray-700 hover:text-white
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
          "
          >Calendar</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import NavLinks from "@/components/auth/NavLinks.vue";
import SubNavbar from "@/components/navbar/SubNavbar.vue";

export default {
  name: "TheNavbar",
  setup() {
    const isScroll = ref(false);
    const store = useStore();
    const router = useRouter();
    const toggleHamburger = ref(false);

    const cart = computed(() => store.getters["cart/cart"]);

    const goPage = (page) => {
      router.push({ name: page });
    };
    const handleScroll = (evt, el) => {
      isScroll.value = window.scrollY > el.offsetTop;
    };
    return {
      cart,
      goPage,
      handleScroll,
      isScroll,
      toggleHamburger,
    };
  },
  components: {
    NavLinks,
    SubNavbar,
  },
};
</script>
