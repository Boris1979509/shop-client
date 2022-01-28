<template>
    <router-link
        :to="{name: routeName}"
        custom
        v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
        <li>
            <a :class="[isActive && !['admin', 'home'].includes(route.name) || isExactActive ? [
                        ...classMap,
                        'bg-gray-50',
                        'text-gray-800',
                        'border-indigo-500',
                    ] : [...classMap, 'hover:bg-gray-50', 'hover:text-gray-800', 'hover:border-indigo-500']]"
               :href="href"
               @click="navigate"
            >
                <span class="inline-flex justify-center items-center ml-4">
                    <app-icon
                        :icon="icon"
                        class="w-5 h-5"
                    />
                </span>
                <span class="ml-2 text-sm tracking-wide truncate" v-text="label"></span>
                <app-badge
                    v-if="count"
                    class="ml-auto"
                    :label="count"
                    type="primary"
                />
            </a>
        </li>
    </router-link>
</template>

<script>
    export default {
        name: "SidebarNavItem",
        props: {
            isActive: Boolean,
            label: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            routeName: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                default: null
            }
        },
        setup() {
            const classMap = [
                'relative', 'flex', 'flex-row',
                'items-center', 'py-3', 'focus:outline-none',
                'pr-6', 'text-gray-600',
                'border-r-4',
                'border-transparent',
                'transition-all',
                'duration-300'
            ];
            return {classMap}
        }
    }
</script>
