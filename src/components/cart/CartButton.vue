<template>
    <app-button
        :isButtonLoading="isButtonLoading"
        @click.prevent="add"
        type="submit"
    >Add to cart
    </app-button>
</template>

<script>
    import {ref} from "vue";
    import {useStore} from "vuex";

    export default {
        name: "CartButton",
        emits: ["cart-modal"],
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        setup(props, {emit}) {
            const store = useStore();
            const isButtonLoading = ref(false);

            const add = () => {
                isButtonLoading.value = true;
                const delay = async () => {
                    const cartItem = await store.dispatch('cart/addToCart', props.product);
                    if (cartItem) {
                        emit("cart-modal", cartItem);
                    }
                    isButtonLoading.value = false;
                };
                setTimeout(delay, 1000);
            };
            return {isButtonLoading, add}
        }
    }
</script>
