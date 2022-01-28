<template>
    <div class="flex flex-wrap justify-center items-center">
        <div
            :class="['w-' + size, 'h-' + size]"
            class="image-fit rounded-full overflow-hidden">
            <img
                :src="src"
                :alt="alt"
                class="w-full h-full border-none"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppCircleImage",
        props: {
            src: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                default: 10
            },
            alt: {
                type: String,
                default: ""
            }
        }
    }
</script>
