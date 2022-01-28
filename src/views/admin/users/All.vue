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
                @click="isShowFiltersForm = !isShowFiltersForm"
                color="success"
            >
                <app-icon icon="filter" class="w-5 h-5"/>
                Filters
                <app-icon icon="chevron-down" class="transition transform w-4 h-4"
                          :class="{'-rotate-180' : isShowFiltersForm}"/>
            </app-button>
            <app-button
                @click="showModal({name: 'Create', title: 'Add new user'})"
                class="my-3"
            >Add new user
            </app-button>
        </div>
        <transition name="fade">
            <Filters
                v-show="isShowFiltersForm"
                :isShowFiltersForm="isShowFiltersForm"
                @filters-form="filter"
            />
        </transition>
        <template v-if="isContentLoading">
            <app-loader type="content-loader"/>
        </template>
        <template v-else>
            <template v-if="users?.data.length && users?.total > 0">
                <app-table
                    :theadTable="theadTable"
                    :data="users.data"
                    :tbodyTable="tbodyTable"
                    @show-details-item="showUser"
                    @delete-item="deleteUser"
                    :field-badge="['status']"
                    :map-fields="mapFields"
                />
                <app-pagination
                    v-model="page"
                    :links="users.links"
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
    import {ref} from "vue";
    import {useRouter} from "vue-router";
    import AppTable from "@/components/ui/AppTable";
    import Create from "@/components/admin/user/Create";
    import Delete from "@/components/admin/user/Delete";
    import Filters from "@/components/admin/user/Filters";
    import {useUsers} from "@/use/users";

    export default {
        name: "Index",
        emits: ["update:state"],
        props: {
            state: Boolean
        },
        setup() {
            const router = useRouter();
            const page = ref(null);
            const isShowFiltersForm = ref(false);

            /** Modal settings */
            const modal = ref(false);
            const modalComponentName = ref('');
            const modalTitle = ref('');
            const content = ref(null);

            /**
             * Tables thead, tbody
             */
            const theadTable = ['name', 'phone', 'status', 'roles', 'actions'];
            const tbodyTable = ['first_name', 'phone', 'status', 'roles'];
            const mapFields = {roles: 'name'};

            /** Open modal for update delete data */
            const showModal = ({name, title, contentData = null}) => {
                modal.value = true;
                modalComponentName.value = name;
                modalTitle.value = title;
                content.value = contentData;
            };

            /** Show details user item page */
            const showUser = id => {
                router.push(
                    {
                        name: 'admin.user.show',
                        params: {
                            id
                        }
                    }
                );
            };
            /** Delete user item */
            const deleteUser = data => {
                showModal({
                    name: 'Delete',
                    title: 'Delete user',
                    contentData: data
                });
            };

            return {
                ...useUsers(page),
                theadTable,
                tbodyTable,
                page,
                showModal,
                modal,
                showUser,
                deleteUser,
                modalComponentName,
                modalTitle,
                content,
                mapFields,
                isShowFiltersForm
            }
        },
        components: {Create, AppTable, Delete, Filters}
    }
</script>


