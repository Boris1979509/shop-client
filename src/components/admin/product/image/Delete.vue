<template>
    <div>
        <div class="font-bold">
            Are you sure you want to delete, "{{ content.name }}" ?
        </div>
        <div class="flex justify-between items-center mt-5">
            <app-button
                @click="$emit('hide-modal')"
            >Cancel
            </app-button>
            <app-button
                @click="deleteProductImage"
                color="danger"
                :isButtonLoading="isButtonLoading"
            >Delete image
            </app-button>
        </div>
    </div>
</template>

<script>
    import {useProductImageDelete} from "@/use/product/image/delete";

    export default {
        name: "Delete",
        emits: ["hide-modal", "update-images"],
        props: {
            content: {
                type: [Array, Object],
                default: null
            }
        },
        setup(props, {emit}) {
            return {
                ...useProductImageDelete(props, emit)
            }
        }
    }
</script>
