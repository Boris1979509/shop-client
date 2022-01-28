<template>
    <div class="col-span-12 sm:col-span-6 xl:col-span-6">
        <div class="shadow-lg rounded-lg overflow-hidden">
            <div class="p-3 bg-gray-50 flex justify-between items-center">
                <div class="flex items-center">
                    <app-icon
                        :icon="icon"
                        class="w-8 h-8"
                    />
                    <div
                        class="w-px h-12 border border-r border-dashed border-gray-300 dark:border-dark-5 mx-4 xl:mx-5"></div>
                    <div class="flex gap-x-1">
                        <div class="text-3xl font-medium leading-8" v-text="count"></div>
                        <div class="text-base text-gray-600 self-end" v-text="label"></div>
                    </div>
                </div>
                <app-button
                    @click="goPage(route)"
                >Show details
                </app-button>
            </div>
            <slot/>
        </div>
    </div>
</template>

<script>
    import {useRouter} from "vue-router";

    export default {
        name: "AppTag",
        props: {
            icon: String,
            count: Number,
            label: String,
            route: String
        },
        setup() {
            const router = useRouter();
            const goPage = name => {
                router.push({name: name});
            }
            return {goPage}
        }
    }
</script>
