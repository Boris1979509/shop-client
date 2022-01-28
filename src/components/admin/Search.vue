<template>
    <form @submit.prevent="onSubmit" class="flex gap-2 mb-3 lg:w-1/3 ml-auto">
        <div class="flex-grow">
            <app-input
                name="search"
                type="text"
                v-model.trim="search"
            />
        </div>
        <app-button
            type="submit"
        >Search
        </app-button>
    </form>
</template>

<script>
    import {ref} from "vue";

    export default {
        name: "Search",
        emits: ["search"],
        setup(_, {emit}) {
            const search = ref(null);

            const onSubmit = () => {
                emit("search", {search: search.value});
            };
            return {search, onSubmit}
        }
    }
</script>
