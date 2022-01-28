import {ref, onMounted} from "vue";
import {useStore} from "vuex";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import repository from "@/api/repository";
import nestedSets from "@/use/product/category/nested-sets";

export const useProductCategoryStore = emit => {
    const isButtonLoading = ref(false);
    const store = useStore();
    const options = ref(null);
    const multiSelectLoading = ref(true);

    const getParentCategories = async () => {
        options.value = await nestedSets.get();
        multiSelectLoading.value = false;
    };

    onMounted(async () => {
        await getParentCategories();
    });

    const createForm = yup.object({
        name: yup.string().required().label('Name'),
        parent: yup.string().nullable().label('Parent'),
    });

    const {errors, handleSubmit, resetForm} = useForm({
        validationSchema: createForm,
    });
    const {value: name} = useField('name');
    const {value: parent} = useField('parent');

    const onSubmit = handleSubmit(async (data, actions) => {
        store.commit("admin/SET_CATEGORIES", null);
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'post',
            data
        };
        const {errors, response, fetching} = await repository.storeCategory(config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }
        /** Close & reset form */
        resetForm();
        emit("hide-modal");
        emit("redirect-after");
        await store.dispatch("admin/setCategoriesResponseData", response);
        await getParentCategories();
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify

    });
    return {
        name,
        errors,
        isButtonLoading,
        onSubmit,
        resetForm,
        options,
        parent,
        multiSelectLoading
    }
};
