<template>
    <form
        @submit.prevent="onSubmit"
        novalidate
        ref="form"
    >
        <div class="grid grid-cols-6 gap-3">
            <app-input
                class="col-span-3"
                name="id"
                label="ID"
            />
            <app-input
                class="col-span-3"
                name="first_name"
                label="Name"
            />
            <app-input
                class="col-span-3"
                name="email"
                label="Email"
            />
            <app-input
                class="col-span-3"
                name="phone"
                label="Phone"
                id="f_phone"
            />
            <div class="col-span-3">
                <label class="input-label">Status</label>
                <Multiselect
                    :classes="CLASSES"
                    v-model="status"
                    :options="STATUSES"
                    :closeOnSelect="true"
                    :searchable="true"
                    :createTag="false"
                />
            </div>
            <div class="col-span-3">
                <label class="input-label">Roles</label>
                <Multiselect
                    :classes="CLASSES"
                    mode="tags"
                    v-model="roles"
                    :options="options"
                    :closeOnSelect="true"
                    :searchable="true"
                    :createTag="false"
                    :loading="multiSelectLoading"
                />
            </div>
        </div>
        <div class="flex justify-end py-3">
            <div class="flex gap-2">
                <app-button
                    type="submit"
                    color="success"
                >Search
                </app-button>
                <app-button
                    color="danger"
                    @click="reset"
                >Reset
                </app-button>
            </div>
        </div>
    </form>
</template>

<script>
    import {ref, onMounted, watch} from "vue";
    import Multiselect from '@vueform/multiselect';
    import repository from "@/api/repository";
    import {ucfirst} from "@/filters/ucfirst.filter";

    export default {
        name: "Filters",
        emits: ['filters-form'],
        props: {
            isShowFiltersForm: Boolean
        },
        setup(props, {emit}) {
            const options = ref(null);
            const form = ref(null);
            const roles = ref(null);
            const status = ref(null);
            const multiSelectLoading = ref(true);

            const STATUSES = [
                {value: 'active', label: 'Active'},
                {value: 'pending', label: 'Pending'}
            ];
            const CLASSES = {
                container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-500 rounded-lg bg-white text-base leading-snug outline-none',
                containerActive: 'border-blue-600 ring-1 ring-offset-0 ring-blue-600',
                search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded-lg pl-3.5',
            };

            onMounted(async () => {
                const {errors, response} = await repository.roles();
                if (errors) {
                    console.log(errors);
                    return;
                }
                if (Array.isArray(response)) {
                    options.value = response.map(item => ({value: item.id, label: ucfirst(item.name)}));
                }
                multiSelectLoading.value = false;
            });
            const onSubmit = event => {
                const data = Object.fromEntries(new FormData(event.target));
                emit('filters-form', {...data, roles: roles.value, status: status.value});
            };
            const reset = () => {
                form.value.reset();
                roles.value = status.value = null; /** Clear multiselect */
            };
            watch(() => props.isShowFiltersForm, value => {
                if (!value) reset();
            });
            return {
                STATUSES,
                CLASSES,
                onSubmit,
                options,
                reset,
                form,
                roles,
                status,
                multiSelectLoading
            }
        },
        components: {
            Multiselect
        }
    }
</script>
