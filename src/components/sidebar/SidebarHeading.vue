<template>
    <li class="px-5">
        <div class="flex flex-row items-center h-8">
            <div class="text-sm font-light tracking-wide text-gray-500" v-text="title"></div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "SidebarHeading",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>
