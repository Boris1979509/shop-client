import {ref} from "vue";
import {useStore} from "vuex";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import repository from "@/api/repository";
import phoneFormat from "@/helpers/phoneFormat";

export const useUserStore = emit => {
    const PHONE_PATTERN = /\+\d\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/g;
    const PASSWORD_MIN_LENGTH = 6;
    const isButtonLoading = ref(false);
    const store = useStore();

    const createForm = yup.object({
        phone: yup.string().required().matches(PHONE_PATTERN, 'Incorrect phone format.'),
        password: yup.string().required().min(PASSWORD_MIN_LENGTH).label('Password'),
        password_confirmation: yup.string().required()
            .oneOf([yup.ref('password'), null], 'Passwords must match.'),
    });

    const {errors, handleSubmit, resetForm} = useForm({
        validationSchema: createForm,
    });
    const {value: phone} = useField('phone');
    const {value: password} = useField('password');
    const {value: password_confirmation} = useField('password_confirmation');

    const onSubmit = handleSubmit(async (data, actions) => {
        data.phone = phoneFormat.toNumber(data.phone); // Converted phone to number
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'post',
            data
        };
        const {errors, response, fetching} = await repository.createUser(config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }
        emit("hide-modal");
        emit('redirect-after');
        store.commit("admin/SET_USERS", response.users);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
        resetForm();
    });

    return {
        phone,
        password,
        password_confirmation,
        errors,
        isButtonLoading,
        onSubmit,
        resetForm
    }
};
