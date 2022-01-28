import {useStore} from "vuex";
import {ref, onMounted, watch, computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import phoneFormat from "@/helpers/phoneFormat";

export const useUsers = (page) => {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isContentLoading = computed(() => !store.getters["admin/users"]);
    const users = ref(null);
    const filterData = ref(null);

    /** Get users with formatted phone */
    const getUsersWithFormattedPhone = data => {
        users.value = {
            ...data, ...data.data.map(item => item['phone'] = phoneFormat.toStr(item['phone']))
        };
    };
    /** Pagination */
    const fetchPaginator = async () => {
        await store.dispatch("admin/setUsers", {page: page.value, data: filterData.value});
        if (page.value)
            await router.push({name: route.name, query: {page: page.value}});
    };
    /** Filters user */
    const filter = async data => {
        filterData.value = data;
        await fetchPaginator();
    };
    onMounted(async () => {
        const queryParam = route.query.page;
        if (queryParam !== undefined) {
            page.value = +queryParam;
            // start watch
        } else {
            await fetchPaginator();
        }
    });
    /** Watch pagination page */
    watch(() => page.value, async () => {
        await fetchPaginator();
    });
    store.watch((state, getters) => getters["admin/users"], value => {
        if (value) getUsersWithFormattedPhone(value);
    });
    /** Redirect after event */
    const redirectAfter = async () => {
        await router.push({name: route.name}); // admin/products/categories
        page.value = null;
    };
    return {isContentLoading, users, filter, redirectAfter}
};
