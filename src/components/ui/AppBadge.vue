<template>
    <span
        :class="[...classes, ...activeClass]"
        v-text="label"
    ></span>
</template>

<script>
    import {computed} from "vue";

    export default {
        name: "AppBadge",
        props: {
            label: {
                type: [String, Number],
                required: true
            },
            type: {
                type: String,
                default: 'primary',
                validate(value) {
                    return [
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark'
                    ].includes(value);
                }
            }
        },
        setup(props) {
            const classes = [
                'px-2',
                'py-0.5',
                'text-xs',
                'font-medium',
                'tracking-wide',
                'rounded-full'
            ];
            const map = {
                'primary': ['text-indigo-500', 'bg-indigo-50'],
                'success': ['text-green-500', 'bg-green-50'],
                'danger': ['text-red-500', 'bg-red-50'],
            };
            const activeClass = computed(() => map[props.type]);
            return {classes, activeClass}
        }
    }
</script>
