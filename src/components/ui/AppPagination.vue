<template>
    <div v-if="links.length > 3" class="w-full my-5">
        <div class="flex justify-end">
            <ul class="flex bg-white p-2 gap-2 rounded border border-gray-200">
                <li v-for="(link, idx) in links" :key="idx">
                    <span
                        v-if="link.active"
                        :class="[...classes, 'border-blue-600 bg-blue-600 text-white cursor-not-allowed']"
                        v-text="link.label"
                    ></span>
                    <span
                        v-else-if="!link.url"
                        :class="[...classes, 'border-gray-200 bg-gray-200 text-gray-600 cursor-not-allowed']"
                        v-html="link.label"
                    ></span>
                    <a
                        v-else
                        :href="link.url"
                        :class="[...classes, 'border-gray-200 hover:bg-gray-200 no-underline text-gray-600']"
                        @click.prevent="page(link.url)"
                        v-html="link.label"
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "AppPagination",
        emits: ['update:modelValue'],
        props: {
            links: {
                type: Array,
                default: () => []
            },
            modelValue: Number,
        },
        setup(_, {emit}) {
            const classes = [
                'tracking-wide', 'truncate',
                'px-3', 'py-2', 'rounded',
                'border', 'block'
            ];
            const page = url => {
                if (!url) return;
                const idx = url.length - 1;
                emit('update:modelValue', +url[idx]);
            };
            return {page, classes}
        }
    }
</script>
