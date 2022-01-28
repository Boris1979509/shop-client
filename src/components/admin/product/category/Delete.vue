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
                @click="deleteCategory"
                color="danger"
                :isButtonLoading="isButtonLoading"
            >Delete category
            </app-button>
        </div>
    </div>
</template>

<script>
    import {useProductCategoryDelete} from "@/use/product/category/delete";

    export default {
        name: "Delete",
        emits: ["hide-modal", "redirect-after"],
        props: {
            content: {
                type: [Array, Object],
                default: null
            }
        },
        setup(props, {emit}) {
            return {
                ...useProductCategoryDelete(props, emit)
            }
        }
    }
</script>
