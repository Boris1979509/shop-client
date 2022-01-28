<template>
    <app-loader
        v-if="isLoading"
    />
    <div
        v-else
        class="container"
    >
        <app-modal
            v-model:state="modal"
            title="Edit user"
        >
            <Update
                @hide-modal="modal = false"
                :user="user"
                @update-user="updateUser"
            />
        </app-modal>
        <div class="my-3 flex">
            <app-button
                @click="showModal"
            >Edit user
            </app-button>
            <Verify
                v-if="isVerify"
                :id="user.id"
                @update-user="updateUser"
                class="ml-2"
            />
        </div>
        <app-table
            v-if="user"
            :theadTable="theadTable"
            :data="[user]"
            :tbodyTable="tbodyTable"
            :field-badge="['status']"
            :map-fields="mapFields"
        />
    </div>
</template>

<script>
    import {onMounted, ref, computed} from "vue";
    import {useStore} from "vuex";
    import AppTable from "@/components/ui/AppTable";
    import phoneFormat from "@/helpers/phoneFormat";
    import dateFilter from "@/filters/date.filter";
    import Update from "@/components/admin/user/Update";
    import Verify from "@/components/admin/user/Verify";

    export default {
        name: "Show",
        components: {AppTable, Update, Verify},
        props: {
            id: {
                type: [Number, String],
                required: true
            }
        },
        setup(props) {
            const store = useStore();
            const user = ref(null);
            const isLoading = ref(true);
            const modal = ref(false);
            /**
             * Tables thead, tbody
             */
            const theadTable = [
                'first name',
                'last name',
                'phone',
                'email',
                'status',
                'roles',
                'created at'
            ];
            const tbodyTable = [
                'first_name',
                'last_name',
                'phone',
                'email',
                'status',
                'roles',
                'created_at'
            ];
            const mapFields = {roles: 'name'};
            /** */

            const getUser = async () => {
                await store.dispatch("admin/setUser", props.id);
                const userData = store.getters["admin/user"];
                if (userData) {
                    userData.phone = phoneFormat.toStr(userData.phone);
                    userData.created_at = dateFilter.localeString(userData.created_at);
                    user.value = userData;
                }
                isLoading.value = false;
            };

            onMounted(async () => {
                await getUser();
            });

            // Open modal click button
            const showModal = () => {
                modal.value = true;
            };
            // Emit from "update" component, after update user
            const updateUser = () => {
                getUser();
            };
            // verify user
            const isVerify = computed(() => user.value.status !== 'active');

            return {
                theadTable,
                tbodyTable,
                user,
                mapFields,
                isLoading,
                modal,
                showModal,
                updateUser,
                isVerify
            }
        }
    }
</script>
