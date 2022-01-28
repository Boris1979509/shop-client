<template>
    <div>
        <label
            :for="name"
            v-text="label"
            class="input-label"
        ></label>
        <select class="form-select rounded-lg w-full"
                :id="name"
                :name="name"
                :value="modelValue"
                @change="change"
                :class="{'is-invalid': errorMessage}"
        >
            <option selected value="">-- choose --</option>
            <option
                v-for="(option, idx) in options"
                :key="idx"
                :value="option.value"
                v-text="option.label"
            ></option>
        </select>
        <div class="invalid-feedback" v-if="errorMessage" v-text="errorMessage"></div>
    </div>
</template>

<script>
    export default {
        name: "AppInputSelect",
        emits: ["update:modelValue"],
        props: {
            errorMessage: {
                type: String,
                default: null
            },
            name: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            options: Array,
            modelValue: String
        },
        setup(_, {emit}) {
            const change = event => {
                emit('update:modelValue', event.target.value);
            };
            return {change}
        }
    }
</script>
