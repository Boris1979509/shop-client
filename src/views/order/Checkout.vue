<template>
    <app-loader v-if="isLoading"/>
    <cart-list else/>
</template>

<script>
    import {ref, onMounted} from "vue";
    import CartList from "@/components/cart/CartList";

    export default {
        name: "Checkout",
        props: {
            user: [Object, null]
        },
        setup() {
            const isLoading = ref(true);
            onMounted(() => {
                setTimeout(() => {
                    isLoading.value = false;
                }, 1000);
            });
            return {isLoading}
        },
        components: {
            CartList
        }
    }
</script>
