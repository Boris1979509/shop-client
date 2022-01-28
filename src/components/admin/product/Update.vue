<template>
    <app-modal
        v-if="modal"
        v-model:state="modal"
        :title="modalTitle"
    >
        <Delete
            @hide-modal="modal = false"
            :content="content"
            @update-images="updateImages"
        />
    </app-modal>
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
        <app-textarea
            label="Description"
            name="description"
            v-model.trim="description"
            :error-message="errors.description"
            :rows="3"
        />
        <app-input
            label="Price"
            name="price"
            type="number"
            v-model.number="price"
            :error-message="errors.price"
        />
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
        <div>
            <label class="form-label">Upload Image</label>
            <div class="border-2 border-dashed dark:border-dark-5 rounded-md p-4">
                <div class="p-4 bg-gray-100 rounded-md">
                    <transition name="fade">
                        <template v-if="images.length">
                            <div class="flex flex-wrap gap-4">
                                <draggable
                                    v-model="images"
                                    tag="transition-group"
                                    :component-data="{ name: 'fade' }"
                                    item-key="id"
                                    @change="sortImages"
                                >
                                    <template #item="{ element }">
                                        <div class="w-24 h-24 relative cursor-move">
                                            <div
                                                class="absolute focus:outline-none flex items-center justify-center text-white text-xs bg-green-400 bottom-1 left-1 rounded-full w-5 h-5">
                                                {{ element.order }}
                                            </div>
                                            <img class="w-full h-full rounded-lg image-fit border-none shadow-lg"
                                                 :alt="element.name"
                                                 :src="element.full_path"
                                            />
                                            <button
                                                type="button"
                                                @click="showConfirmationModal({title: 'Delete image', contentData: {...element, currentTarget: $event.currentTarget}})"
                                                class="absolute focus:outline-none flex items-center justify-center text-white bg-white -top-2 -right-2 rounded-full shadow-lg w-6 h-6">
                                                <app-icon icon="x" class="h-4 w-4 text-red-400"/>
                                            </button>
                                        </div>
                                    </template>
                                </draggable>
                            </div>
                        </template>
                        <app-alert v-else type="info"> No data found.</app-alert>
                    </transition>
                </div>
            </div>
        </div>
        <div>
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
        </div>
        <div>
            <label class="input-label">Enabled</label>
            <app-radio-input
                v-model="enabled"
                name="enabled"
                id="enabled-yes"
                value="yes"
                :checked="product.enabled === 'yes'"
            >
                Yes
            </app-radio-input>
            <app-radio-input
                v-model="enabled"
                name="enabled"
                id="enabled-no"
                value="no"
                :checked="product.enabled === 'no'"
            >
                No
            </app-radio-input>
        </div>
        <app-button
            :disabled="process"
            type="submit"
            :isButtonLoading="isButtonLoading"
        >Update
        </app-button>
    </form>
</template>

<script>
    import {ref} from "vue";
    import {useProductUpdate} from "@/use/product/update";
    import Multiselect from '@vueform/multiselect';
    import draggable from "vuedraggable";
    import Delete from "@/components/admin/product/image/Delete";
    import {useProductImageUpdate} from "@/use/product/image/update";
    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

    export default {
        name: "Update",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const modal = ref(false);
            const modalTitle = ref('');
            const content = ref(null);
            const CLASSES = {
                container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-500 rounded-lg bg-white text-base leading-snug outline-none',
                containerActive: 'border-blue-600 ring-1 ring-offset-0 ring-blue-600',
                search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded-lg pl-3.5',
            };
            /** Open confirmation modal for update or delete data */
            const showConfirmationModal = ({title, contentData}) => {
                modal.value = true;
                modalTitle.value = title;
                content.value = contentData;
            };

            return {
                modal,
                modalTitle,
                content,
                showConfirmationModal,
                CLASSES,
                ...useProductUpdate(props),
                ...useProductImageUpdate(props),
            }
        },
        components: {
            Delete,
            Multiselect,
            draggable,
            FilePond: vueFilePond(
                FilePondPluginFileValidateSize,
                FilePondPluginFileValidateType,
                FilePondPluginImagePreview
            ),
        }
    }
</script>
