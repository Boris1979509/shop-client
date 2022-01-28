<template>
    <form @submit="onSubmit" class="space-y-3" novalidate>
        <app-input
            label="First name"
            name="first_name"
            type="text"
            v-model.trim="first_name"
            :error-message="errors.first_name"
        />
        <app-input
            label="Last name"
            name="last_name"
            type="text"
            v-model.trim="last_name"
            :error-message="errors.last_name"
        />
        <app-phone-input
            :error-message="errors.phone"
            v-model="phone"
        />
        <app-input
            label="Email"
            name="email"
            type="email"
            v-model.trim="email"
            :error-message="errors.email"
        />
        <div>
            <Multiselect
                :classes="CLASSES"
                placeholder="-- select role --"
                v-model="roles"
                name="roles"
                :options="options"
                mode="tags"
                :closeOnSelect="true"
                :searchable="true"
                :createTag="false"
            />
            <div class="invalid-feedback" v-if="errors.roles" v-text="errors.roles"></div>
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
    import {useUserUpdate} from "@/use/user/update";

    export default {
        name: "Update",
        emits: ["hide-modal", "update-user", "redirect-after"],
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        setup(props, {emit}) {
            return {
                ...useUserUpdate(props, emit)
            }
        },
        components: {
            Multiselect
        },
    }
</script>
