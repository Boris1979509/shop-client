<template>
  <div class="container">
    <teleport to="body" v-if="isShowModal">
      <cart-modal
        :cart-item="cartItem"
        :isShowModal="isShowModal"
        @close="isShowModal = false"
      />
    </teleport>
    <template v-if="products.total > 0">
      <app-loader v-if="isContentLoading" type="content-loader" />
      <div v-else class="flex flex-wrap -mx-4">
        <div
          class="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-3"
          v-for="product in products.data"
          :key="product.id"
        >
          <product-item :product="product" @cart-modal="show" />
        </div>
        <app-pagination v-model="page" :links="products.links" />
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";
import ProductItem from "@/components/product/ProductItem.vue";
import CartModal from "@/components/cart/CartModal.vue";
import AppPagination from "@/components/ui/AppPagination.vue";
import { useProducts } from "@/use/products";

export default {
  name: "ProductsList",
  setup() {
    const cartItem = ref({});
    const isShowModal = ref(false);
    const page = ref(null);

    const show = (item) => {
      cartItem.value = item;
      isShowModal.value = !isShowModal.value;
    };
    return {
      cartItem,
      isShowModal,
      show,
      page,
      ...useProducts(page),
    };
  },
  components: {
    AppPagination,
    ProductItem,
    CartModal,
  },
};
</script>
