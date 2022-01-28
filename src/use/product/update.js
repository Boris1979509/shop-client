import {ref, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {useUploadFiles} from "@/use/upload-files";
import nestedSets from "@/use/product/category/nested-sets";
import repository from "@/api/repository";

export const useProductUpdate = (props) => {
    const store = useStore();
    const router = useRouter();
    const isButtonReload = ref(false);
    const pond = ref(null);
    const isButtonLoading = ref(false);
    const multiSelectLoading = ref(true);
    const options = ref(null);
    const enabled = ref(props.product.enabled);

    const {server, uploadFiles, process} = useUploadFiles('admin/products'); // Upload files

    const updateForm = yup.object({
        name: yup.string().required().label('Name'),
        slug: yup.string().required().label('Slug'),
        price: yup.number().required().label('Price'),
        description: yup.string().nullable().label('Description'),
        categories: yup.array().min(1).label('Categories')
    });
    const {errors, handleSubmit} = useForm({
        validationSchema: updateForm,
    });
    const {value: name} = useField('name');
    const {value: slug} = useField('slug');
    const {value: description} = useField('description');
    const {value: price} = useField('price');
    const {value: categories} = useField('categories');

    const setDefaultInputsValue = () => {
        name.value = props.product.name;
        slug.value = props.product.slug;
        description.value = props.product.description;
        price.value = props.product.price;
    };
    const setCategoriesForMultiselect = async () => {
        /** set options */
        options.value = await nestedSets.get();
        /** set model value only ids [] */
        categories.value = props.product.categories
            .map(item => item.id);
        multiSelectLoading.value = false; /** Multiselect loader */
    };
    onMounted(async () => {
        setDefaultInputsValue();
        await setCategoriesForMultiselect();
    });

    const onSubmit = handleSubmit(async (data, actions) => {
        isButtonLoading.value = true;
        if (uploadFiles.value.length) {
            data.image = uploadFiles.value; // Result array
        }
        data.enabled = enabled.value;
        /** Set Enabled */

        const config = { // config fetch
            method: 'put',
            data
        };

        const {errors, response, fetching} = await repository.updateProduct(props.product.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }
        isButtonReload.value = true;
        pond.value.removeFiles(); // Remove all files []
        uploadFiles.value.length = 0;

        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
        router.go(-1);
    });
    return {
        name,
        slug,
        price,
        description,
        categories,
        errors,
        onSubmit,
        server,
        process,
        isButtonLoading,
        multiSelectLoading,
        options,
        enabled,
        pond,
        isButtonReload
    }
};
