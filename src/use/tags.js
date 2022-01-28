import {ref, onMounted, reactive, toRefs, onUnmounted} from "vue";
import repository from "@/api/repository";

export const useTags = () => {
    const isLoading = ref(true);
    const userCount = ref(null);
    const activeUsers = ref(null);
    const pendingUsers = ref(null);
    const productCount = ref(null);
    const categoryCount = ref(null);
    let timerId;

    const tags = reactive({
        users: {
            icon: 'users',
            label: 'Users',
            count: userCount,
            route: 'admin.users',
            chartSets: [
                {
                    data: activeUsers,
                    borderColor: '#0495d9',
                    label: 'Active',
                },
                {
                    data: pendingUsers,
                    borderColor: 'rgb(217,217,217)',
                    label: 'Pending',
                },
            ]
        },
        products: {
            icon: 'database',
            label: 'Products',
            count: productCount,
            route: 'admin.products'
        },
        categories: {
            icon: 'collection',
            label: 'Categories',
            count: categoryCount,
            route: 'admin.products.categories'
        }
    });

    const updateTags = async () => {
        const {
            errors, response: {
                users: {count: userCountData, chart: {active: activeUsersData, pending: pendingUsersData}},
                products: {count: productCountData},
                categories: {count: categoryCountData},
            }
        } = await repository.tags();

        if (errors) {
            console.log(errors);
            return;
        }
        userCount.value = userCountData;
        activeUsers.value = activeUsersData;
        pendingUsers.value = pendingUsersData;
        productCount.value = productCountData;
        categoryCount.value = categoryCountData;

        timerId = setTimeout(updateTags, 5000);
    };

    onMounted(async () => {
        await updateTags();
        isLoading.value = false;
    });

    onUnmounted(() => {
        clearInterval(timerId);
    });

    /** is set prop in tags */
    const issetTags = value => {
        return !!tags[value];
    };

    return {isLoading, issetTags, ...toRefs(tags)}
};
