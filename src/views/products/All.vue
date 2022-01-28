<template>
    <products-list/>
</template>

<script>
    import ProductsList from "@/components/product/ProductsList";

    export default {
        name: "All",
        props: {
            user: [Object, null]
        },
        components: {
            ProductsList
        }
    }
</script>
