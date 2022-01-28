<template>
    <div class="container">
        <Update
            v-if="product"
            :product="product"
        />
        <app-loader v-else type="content-loader"/>
    </div>
</template>

<script>
    import {ref, onMounted} from "vue";
    import {useStore} from "vuex";
    import Update from "@/components/admin/product/Update";

    export default {
        name: "Show",
        props: {
            id: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const store = useStore();
            const product = ref(null);
            onMounted(async () => {
                await store.dispatch("admin/getProduct", props.id);
                product.value = store.getters["admin/product"];
            });
            return {product}
        },
        components: {Update}
    }
</script>
