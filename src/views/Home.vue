<template>
  <products-list />
</template>

<script>
import ProductsList from "@/components/product/ProductsList.vue";

export default {
  name: "Home",
  props: {
    user: [Object, null],
  },
  components: {
    ProductsList,
  },
};
</script>
