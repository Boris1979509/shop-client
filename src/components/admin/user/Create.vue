<template>
    <form @submit="onSubmit" class="space-y-3" novalidate>
        <app-phone-input
            :error-message="errors.phone"
            v-model="phone"
        />
        <app-input
            label="Password"
            name="password"
            type="password"
            v-model.trim="password"
            :error-message="errors.password"
        />
        <app-input
            label="Confirm password"
            name="password_confirmation"
            type="password"
            v-model.trim="password_confirmation"
            :error-message="errors.password_confirmation"
        />
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
    import {useUserStore} from "@/use/user/store";

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
            return {
                ...useUserStore(emit)
            }
        }
    }
</script>
