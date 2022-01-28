<template>
    <tr>
        <td v-if="isIndex" v-text="index + 1" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 w-1/5">
                    <img class="h-full rounded" src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                         alt="">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                        {{ cartItem.name }}
                    </div>
                </div>
            </div>
        </td>
        <td v-if="isIndex" class="px-6 py-4">
            <div class="flex">
                <app-button
                    @click="cartItem.quantity--"
                    type="primary">
                    <app-icon
                        icon="minus-sm"
                        class="h-5 w-5"
                    />
                </app-button>
                <input
                    v-model.number="cartItem.quantity"
                    class="outline-none focus:outline-none text-center w-1/4 px-3 bg-transparent font-normal text-sm hover:text-black focus:text-black md:text-basecursor-default flex items-center outline-none">
                <app-button
                    @click="cartItem.quantity++"
                    type="primary">
                    <app-icon
                        icon="plus-sm"
                        class="h-5 w-5"
                    />
                </app-button>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-else v-text="cartItem.quantity"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-text="formatCurrency(cartItem.price)"></td>
        <td>
            <p
                v-text="formatCurrency(cartLineTotal)"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            ></p>
            <app-button
                v-if="isIndex"
                color="danger"
                @click="remove(index)"
            >Delete
            </app-button>
        </td>
    </tr>
</template>

<script>
    import {useStore} from "vuex";
    import {computed, watch} from "vue";
    import formatCurrency from "@/helpers/formatCurrency";
    import {cartMath} from "@/helpers/cart";

    export default {
        name: "CartItem",
        props: {
            cartItem: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                default: -1,
            }
        },
        setup(props) {
            const cart = cartMath();
            const store = useStore();
            const cartLineTotal = computed(() => {
                if (cart.isValidInputQuantity(props.cartItem.quantity)) {
                    props.cartItem.quantity = 1;
                }
                return cart.totalItem(props.cartItem);
            });
            const isIndex = computed(() => Boolean(props.index !== -1));
            const remove = idx => {
                store.dispatch('cart/removeCartIndex', idx);
            };
            watch(() => props.cartItem.quantity, (value) => {
                const data = {
                    index: props.index,
                    quantity: value
                };
                store.dispatch('cart/updateCartItemQuantity', data);
            });

            return {cartLineTotal, isIndex, remove, formatCurrency}
        }
    }
</script>
