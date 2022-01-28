<template>
    <div class="flex">
        <div
            class="w-5"
            v-for="item in [].length = category.depth"
            :key="item"
        >
        </div>
        <div
            class="overflow-hidden mb-1 rounded-lg border border-gray-200 bg-white shadow-sm w-full">
            <div class="flex items-center justify-between py-2 px-3">
                <div class="flex flex-wrap gap-2 justify-start items-center">
                    <app-badge :label="category.name"/>
                    <app-badge type="danger" :label="category.slug"/>
                </div>
                <app-icon
                    @click="isShowSettings = !isShowSettings"
                    icon="cog"
                    class="w-5 h-5 cursor-pointer"
                />
            </div>
            <div
                v-show="isShowSettings"
                class="border-t border-gray-200 px-3 py-2 bg-gray-50"
            >
                <div class="flex flex-wrap gap-2 items-center">
                    <app-button
                        class="text-sm"
                        @click="$emit('set-order', {action: 'first', id: category.id})"
                    >
                        <app-icon icon="chevron-double-up" class="w-4 h-4 -mr-1"/>
                        First
                    </app-button>
                    <app-button
                        class="text-sm"
                        @click="$emit('set-order', {action: 'up', id: category.id})"
                    >
                        <app-icon icon="chevron-up" class="w-5 h-5 -mr-2"/>
                        Up
                    </app-button>
                    <app-button
                        class="text-sm"
                        @click="$emit('set-order', {action: 'down', id: category.id})"
                    >
                        <app-icon icon="chevron-down" class="w-5 h-5 -mr-2"/>
                        Down
                    </app-button>
                    <app-button
                        class="text-sm"
                        @click="$emit('set-order', {action: 'last', id: category.id})"
                    >
                        <app-icon icon="chevron-double-down" class="w-4 h-4 -mr-1"/>
                        Last
                    </app-button>

                    <app-button
                        class="text-sm"
                        @click="$emit('show-modal', {name: 'Update', title: 'Edit category', contentData: category})"
                    >
                        <app-icon icon="pencil-alt" class="w-4 h-4 -mr-1"/>
                        Edit
                    </app-button>
                    <app-button
                        @click="$emit('show-modal', {name: 'Delete', title: 'Delete category', contentData: category})"
                        color="danger"
                        class="text-sm"
                    >
                        <app-icon icon="trash" class="w-4 h-4 -mr-1"/>
                        Delete
                    </app-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref} from "vue";

    export default {
        name: "CategoryItem",
        emits: ["set-order", "show-modal"],
        props: {
            category: {
                type: Object,
                default: () => ({})
            }
        },
        setup() {
            const isShowSettings = ref(false);
            return {isShowSettings}
        }
    }
</script>
