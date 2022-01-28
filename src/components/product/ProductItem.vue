<template>
  <a
    href="#"
    class="
      c-card
      block
      bg-white
      shadow-md
      hover:shadow-xl
      rounded-lg
      overflow-hidden
    "
  >
    <div class="relative pb-48 overflow-hidden">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
        alt=""
      />
    </div>
    <div class="p-3">
      <h2 class="mt-2 mb-2 font-bold" v-text="product.name"></h2>
      <p
        class="text-sm"
        v-for="category in product.categories"
        :key="category.id"
        v-text="category.name"
      ></p>
      <div class="mt-3 flex items-center">
        <span class="text-sm font-semibold">price</span>&nbsp;<span
          class="font-bold text-xl"
          v-text="formatCurrency(product.price)"
        ></span>
      </div>
    </div>
    <div class="p-3 flex items-center justify-between">
      <app-button @click.prevent="productShow">Show details </app-button>
      <cart-button
        @cart-modal="show"
        :product="product"
      /><!-- Add to cart button -->
    </div>
  </a>
</template>

<script>
import { useRouter } from "vue-router";
import CartButton from "@/components/cart/CartButton.vue";
import formatCurrency from "@/helpers/formatCurrency";

export default {
  name: "ProductItem",
  emits: ["cart-modal"],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const productShow = () => {
      router.push({
        name: "product.show",
        params: {
          slug: props.product.slug,
        },
      });
    };
    const show = (item) => {
      emit("cart-modal", item);
    };
    return { productShow, show, formatCurrency };
  },
  components: {
    CartButton,
  },
};
</script>
<style>
/* .c-card {
  img {
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  } 
} */
</style>
