<template>
    <form @submit.prevent="onSubmit" class="space-y-3" novalidate>
        <app-input
            label="Name"
            name="name"
            type="text"
            v-model.trim="name"
            :error-message="errors.name"
        />
        <div>
            <Multiselect
                :classes="CLASSES"
                placeholder="-- select parent --"
                v-model="parent"
                :options="options"
                :closeOnSelect="true"
                :searchable="true"
                :createTag="false"
                :loading="multiSelectLoading"
            />
            <div class="invalid-feedback" v-if="errors.parent" v-text="errors.parent"></div>
        </div>
        <div class="flex justify-between">
            <app-button
                type="submit"
                :isButtonLoading="isButtonLoading"
            >Create
            </app-button>
            <app-button
                color="danger"
                @click="resetForm"
            >Reset
            </app-button>
        </div>
    </form>
</template>

<script>
    import {useProductCategoryStore} from "@/use/product/category/store";
    import Multiselect from '@vueform/multiselect';

    export default {
        name: "Create",
        emits: ["hide-modal", "redirect-after"],
        props: {
            content: {
                type: [Array, Object],
                default: null
            }
        },
        setup(_, {emit}) {
            const CLASSES = {
                container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-500 rounded-lg bg-white text-base leading-snug outline-none',
                containerActive: 'border-blue-600 ring-1 ring-offset-0 ring-blue-600',
                search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded-lg pl-3.5',
            };
            return {
                ...useProductCategoryStore(emit),
                CLASSES
            }
        },
        components: {
            Multiselect
        }
    }
</script>
