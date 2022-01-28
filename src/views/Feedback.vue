<template>
    <div class="container">
        <form
            @submit="onSubmit"
            class="space-y-3"
            novalidate
        >
            <app-input-select
                label="Subject"
                name="subject"
                v-model="subject"
                :error-message="errors.subject"
                :options="options"
            />
            <app-input
                label="Name"
                name="first_name"
                type="text"
                v-model.trim="first_name"
                :error-message="errors.first_name"
            />
            <app-input
                label="Email"
                name="email"
                type="email"
                v-model.trim="email"
                :error-message="errors.email"
            />
            <file-pond
                name="file"
                class-name="my-pond"
                label-idle="Drop files here..."
                credits="false"
                :allow-multiple="false"
                :server="server"
                max-file-size="750KB"
                ref="pond"
                :acceptedFileTypes="['image/*', 'application/pdf']"
            />
            <app-textarea
                label="Message"
                name="message"
                v-model.trim="message"
                :error-message="errors.message"
            />
            <div class="flex justify-between">
                <app-button
                    :disabled="process"
                    type="submit"
                    :isButtonLoading="isButtonLoading"
                >Send
                </app-button>
            </div>
        </form>
    </div>
</template>

<script>
    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

    import {ref} from "vue";
    import {useStore} from "vuex";
    import {useForm, useField} from 'vee-validate';
    import * as yup from 'yup';
    import repository from "@/api/repository";
    import {useUploadFiles} from "@/use/upload-files";

    export default {
        name: "Feedback",
        props: {
            user: [Object, null]
        },
        setup(props) {
            const store = useStore();
            const isButtonLoading = ref(false);
            const pond = ref(null);
            const {server, uploadFiles, process} = useUploadFiles('feedback'); // Upload files
            const options = [
                {label: 'Offer of cooperation', value: 'cooperation'},
                {label: 'Work in the company', value: 'company'}
            ];

            const feedbackForm = yup.object({
                first_name: yup.string().required().label('Name'),
                email: yup.string().required().email().label('Email'),
                message: yup.string().required().label('Message'),
                subject: yup.string().required().label('Subject')
            });

            const {errors, handleSubmit, resetForm} = useForm({
                validationSchema: feedbackForm,
            });
            const {value: first_name} = useField('first_name');
            const {value: email} = useField('email');
            const {value: message} = useField('message');
            const {value: subject} = useField('subject');

            /** User auth */
            first_name.value = props.user?.first_name;
            email.value = props.user?.email;

            const onSubmit = handleSubmit(async (data, actions) => {
                isButtonLoading.value = true;
                if (uploadFiles.value.length) {
                    data.file = uploadFiles.value; /** Array files */
                }
                const config = { // config fetch
                    method: 'post',
                    data
                };
                const {errors, response, fetching} = await repository.feedback(config);
                isButtonLoading.value = fetching;
                if (errors) {
                    actions.setErrors(errors);
                    return;
                }
                // Reset form
                resetForm();
                pond.value.removeFiles(); // Remove all files []
                uploadFiles.value = [];

                await store.dispatch('notifications/setNotify', {
                    message: response.message,
                    type: 'success'
                }); // notify
            });

            return {
                onSubmit,
                first_name,
                email,
                message,
                subject,
                options,
                errors,
                server,
                pond,
                process,
                isButtonLoading
            }
        },
        components: {
            FilePond: vueFilePond(FilePondPluginFileValidateSize, FilePondPluginFileValidateType)
        }
    }
</script>
