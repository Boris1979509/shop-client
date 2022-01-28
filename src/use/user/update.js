import {ref, onMounted} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {ucfirst} from "@/filters/ucfirst.filter";
import phoneFormat from "@/helpers/phoneFormat";

export const useUserUpdate = (props, emit) => {
    const store = useStore();
    const options = ref(null);
    const isButtonLoading = ref(false);
    const PHONE_PATTERN = /\+\d\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}/g;
    const CLASSES = {
        container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-500 rounded-lg bg-white text-base leading-snug outline-none',
        containerActive: 'border-blue-600 ring-1 ring-offset-0 ring-blue-600',
        search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded-lg pl-3.5',
    };
    const updateForm = yup.object({
        first_name: yup.string().nullable(),
        last_name: yup.string().nullable(),
        phone: yup.string().required().matches(PHONE_PATTERN, 'Incorrect phone format.'),
        email: yup.string().email().nullable(),
        roles: yup.array().min(1).label("Roles")
    });

    const {errors, handleSubmit} = useForm({
        validationSchema: updateForm,
    });
    const {value: first_name} = useField('first_name');
    const {value: last_name} = useField('last_name');
    const {value: phone} = useField('phone');
    const {value: email} = useField('email');
    const {value: roles} = useField('roles');

    // default inputs value
    first_name.value = props.user.first_name;
    last_name.value = props.user.last_name;
    phone.value = props.user.phone;
    email.value = props.user.email;

    const setRolesForMultiselect = data => {
        if (!Array.isArray(data)) return;
        /** set options */
        options.value = data.map(item => ({value: item.id, label: ucfirst(item.name)}));
        /** set model value only ids */
        roles.value = props.user.roles.map(item => item.id);
    };

    onMounted(async () => {
        const {errors, response} = await repository.roles(); /** request on get all roles */
        if (errors) {
            console.log(errors);
            return;
        }
        setRolesForMultiselect(response);
    });
    const onSubmit = handleSubmit(async (data, actions) => {
        data.phone = phoneFormat.toNumber(data.phone); // Converted phone to number
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'put',
            data
        };
        const {errors, response, fetching} = await repository.updateUser(props.user.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }
        emit("hide-modal");
        emit("update-user");
        emit('redirect-after');
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    });
    return {
        first_name,
        last_name,
        phone,
        email,
        errors,
        roles,
        options,
        onSubmit,
        isButtonLoading,
        CLASSES
    }
};
