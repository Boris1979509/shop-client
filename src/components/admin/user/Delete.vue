<template>
    <div>
        <div class="font-bold">
            Are you sure you want to delete, "{{ content.phone }}" ?
        </div>
        <div class="flex justify-between items-center mt-5">
            <app-button
                @click="$emit('hide-modal')"
            >Cancel
            </app-button>
            <app-button
                @click="deleteUser"
                color="danger"
                :isButtonLoading="isButtonLoading"
            >Delete user
            </app-button>
        </div>
    </div>
</template>

<script>
    import {useUserDelete} from "@/use/user/delete";

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
                ...useUserDelete(props, emit)
            }
        }
    }
</script>
