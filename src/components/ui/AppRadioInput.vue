<template>
    <div class="flex items-center gap-2">
        <input
            type="radio"
            :id="id"
            :checked="checked"
            :name="name"
            :value="value"
            @change="$emit('update:modelValue', $event.target.value)"
        >
        <label :for="id" class="text-gray-500">
            <slot/>
        </label>
    </div>
</template>

<script>
    export default {
        name: "AppRadioInput",
        emits: ["update:modelValue"],
        props: {
            modelValue: {
                type: String
            },
            name: {type: String, required: true},
            checked: {type: Boolean, default: false},
            id: {type: String, required: true},
            value: {type: String, required: true},
        },
    }
</script>
