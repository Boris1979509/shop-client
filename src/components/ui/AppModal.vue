<template>
    <teleport to="body">
        <transition name="fade">
            <div v-show="state" class="opacity-50 fixed inset-0 z-20 bg-black"></div>
        </transition>
        <div
            v-show="state"
            @click.self="hideModal"
            class="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none justify-center items-center">
            <div class="relative w-auto my-6 mx-auto max-w-3xl">
                <div
                    class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div
                        class="flex items-center justify-between p-2 border-b border-solid border-gray-200 rounded-t">
                        <div class="text-lg ml-3 font-semibold">{{ title }}</div>
                        <app-icon
                            icon="x"
                            @click="hideModal"
                            class="x-close"
                        />
                    </div>
                    <!--body-->
                    <div class="relative p-6 flex-auto">
                        <slot/>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
    export default {
        name: "AppModal",
        emits: ["update:state"],
        props: {
            state: {
                type: Boolean,
                default: false
            },
            title: String
        },
        setup(_, {emit}) {
            const hideModal = () => {
                emit("update:state", false);
            };
            return {hideModal}
        }
    }
</script>
