<template>
    <app-modal
        v-model:state="modal"
        :title="modalTitle"
    >
        <component
            v-if="modalComponentName"
            :is="modalComponentName"
            @hide-modal="modal = false"
            @redirect-after="redirectAfter"
            :content="content"
        />
    </app-modal>
    <div class="container">
        <div class="flex items-center gap-2">
            <app-button
                @click="showModal({name: 'Create', title: 'Add new category'})"
                class="my-3"
            >Add new category
            </app-button>
        </div>
        <Search
            @search="search"
        />
        <template v-if="isContentLoading">
            <app-loader type="content-loader"/>
        </template>
        <template v-else>
            <div v-if="categories?.data.length && categories?.total > 0">
                <transition-group name="fade" tag="div">
                    <category-item
                        v-for="category in  categories.data"
                        :key="category.id"
                        :category="category"
                        @show-modal="showModal"
                        @set-order="setOrder"
                    />
                </transition-group>
                <app-pagination
                    v-model="page"
                    :links="categories.links"
                />
            </div>
            <app-alert
                v-else
                type="info"
            >
                No data found.
            </app-alert>
        </template>
    </div>
</template>

<script>
    import {onMounted, ref, watch, computed} from "vue";
    import {useRouter, useRoute} from "vue-router";
    import {useStore} from "vuex";
    import Create from "@/components/admin/product/category/Create";
    import Delete from "@/components/admin/product/category/Delete";
    import Update from "@/components/admin/product/category/Update";
    import CategoryItem from "@/components/admin/product/category/CategoryItem";
    import repository from "@/api/repository";
    import Search from "@/components/admin/Search";

    export default {
        name: "All",
        setup() {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const categories = ref(null);
            const isContentLoading = computed(() => !store.getters["admin/categories"]);
            const page = ref(null);
            const searchData = ref(null);

            /** Modal settings */
            const modal = ref(false);
            const modalTitle = ref('');
            const content = ref(null);
            const modalComponentName = ref('');

            /** Order categories*/
            const setOrder = async ({action, id}) => {
                const config = { // config fetch
                    method: 'post',
                    data: {id, action}
                };
                const {response} = await repository.setOrderCategory(id, config);
                if (page.value) {
                    await fetchPaginator(); // Request
                    return;
                }
                await store.dispatch("admin/setCategoriesResponseData", response);
            };

            /** Open modal for update delete data */
            const showModal = ({name, title, contentData = null}) => {
                modal.value = true;
                modalComponentName.value = name;
                modalTitle.value = title;
                content.value = contentData;
            };

            /** Pagination */
            const fetchPaginator = async () => {
                await store.dispatch("admin/setCategories", {page: page.value, data: searchData.value});
                if (page.value)
                    await router.push({name: route.name, query: {page: page.value}});
            };

            onMounted(async () => {
                const queryParam = route.query.page;
                if (queryParam !== undefined) {
                    page.value = +queryParam; // start watch
                } else {
                    await fetchPaginator();
                }
            });
            /** Watch pagination page */
            watch(() => page.value, async () => {
                await fetchPaginator();
            });
            /** IF Updated categories store */
            store.watch((state, getters) => getters["admin/categories"], async value => {
                categories.value = value;
            });
            /** Search */
            const search = async data => {
                searchData.value = data;
                await fetchPaginator();
            };
            /** Redirect after event */
            const redirectAfter = async () => {
                await router.push({name: route.name}); // admin/products/categories
                page.value = null;
            };
            return {
                categories,
                isContentLoading,
                page,
                showModal,
                modal,
                modalComponentName,
                modalTitle,
                content,
                setOrder,
                search,
                redirectAfter
            }
        },
        components: {
            Search,
            Create,
            Delete,
            Update,
            CategoryItem
        }
    }
</script>
