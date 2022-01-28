<template>
  <div class="container">
    <template v-if="cartState.length">
      <div class="my-3">
        <app-button @click="clearCart" color="danger"
          >Clear my cart
        </app-button>
      </div>
      <div class="flex flex-col text-left">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="
                shadow
                overflow-hidden
                border-b border-gray-200
                sm:rounded-lg
              "
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                      v-text="`Your cart (${cartQuantity} goods)`"
                    ></th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      quantity
                    </th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      price
                    </th>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      sum
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <cart-item
                    v-for="(item, index) in cartState"
                    :key="item.id"
                    :cart-item="item"
                    :index="index"
                  />
                  <tr class="text-xl font-bold text-gray-900">
                    <td colspan="2" class="px-6 py-3">Total amount</td>
                    <td v-text="cartQuantity" class="px-6 py-3 text-left"></td>
                    <td
                      v-text="formatCurrency(cartTotal)"
                      colspan="2"
                      class="px-6 py-3 text-left"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <form-checkout :cartState="cartState" />
    </template>
    <template v-else>
      <app-alert type="info"> Your cart is empty. </app-alert>
    </template>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import formatCurrency from "@/helpers/formatCurrency";
import CartItem from "@/components/cart/CartItem.vue";
import FormCheckout from "@/components/order/FormCheckout.vue";
import { cartMath } from "@/helpers/cart";

export default {
  name: "CartList",
  setup() {
    const cart = cartMath();
    const store = useStore();

    const cartState = computed(() => store.getters["cart/cart"]);
    const cartQuantity = computed(() => cart.quantity(cartState.value));
    const cartTotal = computed(() => cart.total(cartState.value));
    const clearCart = () => {
      store.dispatch("cart/clearCart");
    };
    return { cartQuantity, cartTotal, cartState, clearCart, formatCurrency };
  },
  components: {
    CartItem,
    FormCheckout,
  },
};
</script>
