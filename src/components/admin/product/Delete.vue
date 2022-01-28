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
                @click="deleteProduct"
                color="danger"
                :isButtonLoading="isButtonLoading"
            >Delete product
            </app-button>
        </div>
    </div>
</template>

<script>
    import {useProductDelete} from "@/use/product/delete";

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
                ...useProductDelete(props, emit)
            }
        }
    }
</script>
