import {useStore} from "vuex";
import {onMounted, watch} from "vue";
import {useRouter, useRoute} from "vue-router";

export const useFetchPaginator = (action, page, data) => {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const fetch = async () => {
        await store.dispatch(action, {page: page.value, data: data.value});
        if (page.value)
            await router.push({name: route.name, query: {page: page.value}});
    };
    onMounted(async () => {
        const queryParam = route.query.page;
        if (queryParam !== undefined) {
            page.value = +queryParam; // start watch
        } else {
            await fetch();
        }
    });
    /** Watch pagination page */
    watch(() => page.value, async () => {
        await fetch();
    });
    return {fetch}
};
