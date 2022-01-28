<template>
    <app-loader
        v-if="isLoading"
    />
    <product-show
        v-if="product"
        :product="product"
    />
</template>

<script>
    import {useStore} from "vuex";
    import {ref, onMounted} from "vue";
    import ProductShow from "@/components/product/ProductShow";

    export default {
        name: "Show",
        props: {
            slug: {
                type: String,
                required: true
            },
            user: [Object, null]
        },
        setup(props) {
            const store = useStore();
            const isLoading = ref(false);
            const product = ref(null);

            onMounted(async () => {
                isLoading.value = true;
                await store.dispatch("products/find", props.slug);
                product.value = store.getters["products/product"];
                isLoading.value = false;
            });

            return {
                product,
                isLoading
            }
        },
        components: {
            ProductShow
        }
    }
</script>
