import {useStore} from "vuex";
import {ref, onMounted, watch, computed} from "vue";
import {useRouter, useRoute} from "vue-router";

export const useProducts = (page) => {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isContentLoading = ref(false);
    const products = computed(() => store.getters['products/products']);

    const fetch = async () => {
        isContentLoading.value = true;
        await store.dispatch("products/fetchProducts", page.value);
        if (page.value) {
            await router.push({name: route.name, query: {page: page.value}});
        }
        isContentLoading.value = false;
    };
    onMounted(async () => {
        const queryParam = route.query.page;
        if (queryParam !== undefined) {
            page.value = +queryParam;
        }
        await fetch();
    });
    watch(() => page.value, async () => {
        await fetch();
    });
    return {isContentLoading, products}
};
