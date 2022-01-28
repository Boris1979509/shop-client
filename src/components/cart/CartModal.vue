<template>
    <!-- Modal -->
    <div
        :class="{'hidden': !isShowModal}"
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
            <!--content-->
            <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                    <h3 class="text-3xl font-semibold">
                        Your shopping cart
                    </h3>
                    <app-icon
                        icon="x"
                        @click="close"
                        class="x-close"
                    />
                </div>
                <!--body-->
                <div class="relative p-6 flex-auto">
                    <div class="flex flex-col text-left">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                name
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                quantity
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                price
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                total
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                        <cart-item :cart-item="cartItem"/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                    <app-button
                        @click="close"
                        class="mr-3"
                    >Continue shopping
                    </app-button>
                    <app-button
                        @click="redirectToCheckoutPage"
                    >
                        Checkout
                    </app-button>
                </div>
            </div>
        </div>
    </div>
    <div
        :class="{'hidden': !isShowModal}"
        class="opacity-50 fixed inset-0 z-40 bg-black"
    ></div>
</template>

<script>
    import {useRouter} from 'vue-router';
    import CartItem from "@/components/cart/CartItem.vue";

    export default {
        name: "CartModal",
        emits: ["close"],
        props: {
            isShowModal: {
                type: Boolean
            },
            cartItem: {
                type: Object,
                required: true
            }
        },
        setup(_, {emit}) {
            const router = useRouter();
            const close = () => {
                emit('close');
            };
            const redirectToCheckoutPage = () => {
                close();
                router.push({name: 'order.checkout'});
            };
            return {
                redirectToCheckoutPage,
                close
            }
        },
        components: {
            CartItem
        }
    }
</script>
