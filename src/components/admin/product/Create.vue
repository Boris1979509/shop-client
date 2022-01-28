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
            label="Price"
            name="price"
            type="number"
            v-model.number="price"
            :error-message="errors.price"
        />
        <app-textarea
            label="Description"
            name="description"
            v-model.trim="description"
            :error-message="errors.description"
            :rows="3"
        />
        <file-pond
            name="image"
            class-name="my-pond"
            label-idle="Drop files here..."
            credits="false"
            allow-multiple="true"
            :server="server"
            max-file-size="750KB"
            ref="pond"
            :acceptedFileTypes="['image/*']"
            instantUpload="true"
            chunkUploads="true"
        />
        <div class="invalid-feedback" v-if="errors.image" v-text="errors.image"></div>
        <div>
            <Multiselect
                :classes="CLASSES"
                placeholder="-- Choose category --"
                v-model="categories"
                name="categories"
                mode="tags"
                :options="options"
                :closeOnSelect="true"
                :searchable="true"
                :createTag="false"
                :loading="multiSelectLoading"
            />
            <div class="invalid-feedback" v-if="errors.categories" v-text="errors.categories"></div>
        </div>
        <div class="flex justify-between">
            <app-button
                :disabled="process"
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
    import {useProductStore} from "@/use/product/store";
    import Multiselect from '@vueform/multiselect';
    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

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
                ...useProductStore(emit), CLASSES
            }
        },
        components: {
            FilePond: vueFilePond(
                FilePondPluginFileValidateSize,
                FilePondPluginFileValidateType,
                FilePondPluginImagePreview
            ),
            Multiselect
        }
    }
</script>
