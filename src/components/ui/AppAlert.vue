<template>
    <div
        class="alert"
        :class="['alert-' + type]"
        role="alert"
    >
        <div class="flex">
            <app-icon
                :icon="alert.icon"
                class="h-6 w-6 text-teal mr-2"
            />
            <div>
                <p class="block sm:inline font-bold" v-text="alert.title"></p>
                <p class="block sm:inline">
                    <slot/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref} from "vue";

    export default {
        name: "AppAlert",
        props: {
            type: {
                type: String,
                required: true,
                validator(value) {
                    return ['error', 'success', 'info', 'warning'].includes(value)
                }
            }
        },
        setup(props) {
            const alertMap = {
                error: {
                    title: 'Error!',
                    icon: 'exclamation-circle'
                },
                success: {
                    title: 'Success!',
                    icon: 'check'
                },
                info: {
                    title: 'Info!',
                    icon: 'information-circle'
                },
                warning: {
                    title: 'Warning!',
                    icon: 'information-circle'
                }
            };
            const alert = ref(alertMap[props.type]);
            return {alert}
        }
    }
</script>
