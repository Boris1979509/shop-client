<template>
    <form @submit="onSubmit" class="space-y-3" novalidate>
        <app-input
            label="Name"
            name="name"
            type="text"
            v-model.trim="name"
            :error-message="errors.name"
        />
        <app-input
            label="Slug"
            name="slug"
            type="text"
            v-model.trim="slug"
            :error-message="errors.slug"
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
        <app-button
            type="submit"
            :isButtonLoading="isButtonLoading"
        >Update
        </app-button>
    </form>
</template>

<script>
    import Multiselect from '@vueform/multiselect';
    import {useProductCategoryUpdate} from "@/use/product/category/update";

    export default {
        name: "Update",
        emits: ["hide-modal", "redirect-after"],
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        setup(props, {emit}) {
            const CLASSES = {
                container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-500 rounded-lg bg-white text-base leading-snug outline-none',
                containerActive: 'border-blue-600 ring-1 ring-offset-0 ring-blue-600',
                search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded-lg pl-3.5',
            };
            return {
                ...useProductCategoryUpdate(props, emit),
                CLASSES
            }
        },
        components: {
            Multiselect
        },
    }
</script>
