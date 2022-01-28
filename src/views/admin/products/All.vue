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
        <app-button
            @click="showModal({name: 'Create', title: 'Add new product'})"
            class="my-3"
        >Add new product
        </app-button>
        <Search
            @search="search"
        />
        <template v-if="isContentLoading">
            <app-loader type="content-loader"/>
        </template>
        <template v-else>
            <template v-if="products?.data.length && products?.total > 0">
                <app-table
                    :theadTable="theadTable"
                    :data="products.data"
                    :tbodyTable="tbodyTable"
                    @show-details-item="showProduct"
                    @delete-item="deleteProduct"
                    :map-fields="mapFields"
                />
                <app-pagination
                    v-model="page"
                    :links="products.links"
                />
            </template>
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
    import {ref, computed} from "vue";
    import {useStore} from "vuex";
    import {useRouter, useRoute} from "vue-router";
    import {useFetchPaginator} from "@/use/fetch-paginator";
    import AppTable from "@/components/ui/AppTable";
    import Create from "@/components/admin/product/Create";
    import Delete from "@/components/admin/product/Delete";
    import Search from "@/components/admin/Search";
    import formatCurrency from "@/helpers/formatCurrency";
    import {ucfirst} from "@/filters/ucfirst.filter";

    export default {
        name: "All",
        emits: ["update:state"],
        props: {
            state: Boolean
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore();
            const products = ref(null);
            const page = ref(null);
            const searchData = ref(null);
            const isShowFiltersForm = ref(false);
            const isContentLoading = computed(() => !store.getters["admin/products"]);
            const pagination = useFetchPaginator('admin/setProducts', page, searchData);

            /** Modal settings */
            const modal = ref(false);
            const modalComponentName = ref('');
            const modalTitle = ref('');
            const content = ref(null);
            /**
             * Tables thead, tbody
             */
            const theadTable = ['id', 'enabled', 'image', 'name', 'price', 'category', 'actions'];
            const tbodyTable = ['id', 'enabled', 'images', 'name', 'price', 'categories'];
            const mapFields = {categories: 'name'};

            /** Open modal for update delete data */
            const showModal = ({name, title, contentData = null}) => {
                modal.value = true;
                modalComponentName.value = name;
                modalTitle.value = title;
                content.value = contentData;
            };

            /** Show product for edit */
            const showProduct = id => {
                router.push({name: 'admin.product.show', params: {id}});
            };

            /** Delete product */
            const deleteProduct = contentData => {
                showModal({
                    name: 'Delete',
                    title: 'Delete product',
                    contentData
                });
            };
            /** Search */
            const search = async data => {
                searchData.value = data;
                pagination.fetch();
                await redirectAfter();
            };
            /** Redirect after events */
            const redirectAfter = async () => {
                /** if delete */
                if (products.value.length === 0 && page.value > 1) {
                    page.value -= 1;
                    return;
                }
                await router.push({name: route.name}); // admin/products
                page.value = null;
            };
            /** filter data */
            const getProductsFilterFields = data => {
                products.value = {
                    ...data, ...data.data.map(item => {
                        item.price = formatCurrency(item.price);
                        item.enabled = ucfirst(item.enabled);
                        item.images = item.images.filter(item => item.order === 1);
                        return item;
                    })
                };
            };
            store.watch((state, getters) => getters["admin/products"], value => {
                if (value) getProductsFilterFields(value);
            });
            return {
                isContentLoading,
                theadTable,
                tbodyTable,
                products,
                showProduct,
                deleteProduct,
                page,
                isShowFiltersForm,
                showModal,
                modal,
                modalComponentName,
                modalTitle,
                content,
                redirectAfter,
                mapFields,
                search
            }
        },
        components: {
            AppTable, Create, Search, Delete
        }
    }
</script>
