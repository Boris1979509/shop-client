<template>
    <app-button
        :isButtonLoading="isButtonLoading"
        color="success"
        @click="verify"
    >Verify
    </app-button>
</template>

<script>
    import {ref} from "vue";
    import {useStore} from "vuex";
    import repository from "@/api/repository";

    export default {
        name: "Verify",
        emits: ["update-user"],
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        setup(props, {emit}) {
            const isButtonLoading = ref(false);
            const store = useStore();

            const verify = async () => {
                isButtonLoading.value = true;
                const {errors, response, fetching} = await repository.verifyUser(props.id);
                isButtonLoading.value = fetching;
                if (errors) {
                    console.log(errors);
                    return;
                }
                emit("update-user");
                await store.dispatch('notifications/setNotify', {
                    message: response.message,
                    type: 'success'
                }); // notify
            };

            return {isButtonLoading, verify}
        }
    }
</script>
