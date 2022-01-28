import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import repository from "@/api/repository";
import nestedSets from "@/use/product/category/nested-sets";
import {useUploadFiles} from "@/use/upload-files";

export const useProductStore = emit => {
    const pond = ref(null);
    const isButtonLoading = ref(false);
    const options = ref(null);
    const store = useStore();
    const multiSelectLoading = ref(true);
    const {server, uploadFiles, process} = useUploadFiles('admin/products'); // Upload files

    const createForm = yup.object({
        name: yup.string().required().label('Name'),
        price: yup.number().required().label('Price'),
        description: yup.string().nullable().label('Description'),
        categories: yup.array().min(1).label("Categories")
    });

    const {errors, handleSubmit, resetForm} = useForm({
        validationSchema: createForm,
    });
    const {value: name} = useField('name');
    const {value: price} = useField('price');
    const {value: description} = useField('description');
    const {value: categories} = useField('categories');

    /** Categories list */
    const setCategoriesForMultiselect = async () => {
        /** set options */
        options.value = await nestedSets.get();
        multiSelectLoading.value = false; /** Multiselect loader */
    };

    onMounted(async () => {
        await setCategoriesForMultiselect();
    });

    const onSubmit = handleSubmit(async (data, actions) => {
        isButtonLoading.value = true;
        if (uploadFiles.value.length) {
            data.image = uploadFiles.value; // Result array
        }
        const config = { // config fetch
            method: 'post',
            data
        };
        const {errors, response, fetching} = await repository.createProduct(config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }
        // Reset form
        resetForm();
        pond.value.removeFiles(); // Remove all files []
        uploadFiles.value.length = 0;

        emit("hide-modal");
        emit('redirect-after');
        store.commit("admin/SET_PRODUCTS", response.products);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    });

    return {
        name,
        price,
        description,
        categories,
        errors,
        isButtonLoading,
        onSubmit,
        resetForm,
        multiSelectLoading,
        options,
        server,
        process,
        pond
    }
};
