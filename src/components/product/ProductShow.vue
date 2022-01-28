<template>
    <teleport to="body" v-if="isShowModal">
        <cart-modal
            :cart-item="cartItem"
            :isShowModal="isShowModal"
            @close="isShowModal = false"
        />
    </teleport>
    <div class="container">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="md:flex-shrink-0">
                    <img class="h-48 w-full object-cover md:h-full md:w-48"
                         src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="">
                </div>
                <div class="p-8">
                    <div
                        v-text="product.name"
                        class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    </div>
                    <p
                        v-text="product.description"
                        class="mt-2 text-gray-500">
                    </p>
                    <p
                        v-text="formatCurrency(product.price)"
                        class="mt-2 font-bold text-lg">
                    </p>
                    <div class="mt-3">
                        <cart-button
                            @cart-modal="show"
                            :product="product"
                        /><!-- Add to cart button -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive, toRefs, onMounted} from "vue";
    import formatCurrency from "@/helpers/formatCurrency";
    import CartModal from "@/components/cart/CartModal.vue";
    import CartButton from "@/components/cart/CartButton.vue";

    export default {
        name: "ProductShow",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const state = reactive({
                isButtonLoading: false,
                isShowModal: false,
                cartItem: {}
            });
            onMounted(() => {
                document.title = props.product.name;
            });
            const show = item => {
                state.cartItem = item;
                state.isShowModal = !state.isShowModal;
            };

            return {formatCurrency, ...toRefs(state), show}
        },
        components: {
            CartModal,
            CartButton
        }
    }
</script>
