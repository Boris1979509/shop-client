<template>
    <div>
        <label
            :for="name"
            v-text="label"
            class="input-label"
        ></label>
        <textarea class="form-textarea rounded-lg"
                  :id="name"
                  :name="name"
                  :value="modelValue"
                  @input="change"
                  :class="{'is-invalid': errorMessage}"
                  :cols="cols"
                  :rows="rows"
        ></textarea>
        <div class="invalid-feedback" v-if="errorMessage" v-text="errorMessage"></div>
    </div>
</template>

<script>
    export default {
        name: "AppTextarea",
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
            cols: {
                type: Number,
                default: 45
            },
            rows: {
                type: Number,
                default: 10
            },
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
