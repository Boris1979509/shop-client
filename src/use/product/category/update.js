import {ref, onMounted, watch} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import nestedSets from "@/use/product/category/nested-sets";

export const useProductCategoryUpdate = (props, emit) => {
    const isButtonLoading = ref(false);
    const store = useStore();
    const options = ref(null);
    const multiSelectLoading = ref(true);
    const createForm = yup.object({
        name: yup.string().required().label('Name'),
        slug: yup.string().required().label('Slug'),
        parent: yup.string().nullable().label('Parent'),
    });
    const {errors, handleSubmit} = useForm({
        validationSchema: createForm,
    });
    const {value: name} = useField('name');
    const {value: slug} = useField('slug');
    const {value: parent} = useField('parent');

    const setDefaultInputsValue = () => {
        name.value = props.content.name;
        slug.value = props.content.slug;
        const selectedParent = options.value.find(item => item.value === props.content.parent_id);
        parent.value = selectedParent?.value; // value: 1
    };

    watch(() => props.content, () => {
        setDefaultInputsValue();
    });

    onMounted(async () => {
        options.value = await nestedSets.get();
        if (options.value) {
            setDefaultInputsValue();
        }
        multiSelectLoading.value = false;
    });
    const onSubmit = handleSubmit(async (data, actions) => {
        store.commit("admin/SET_CATEGORIES", null);
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'put',
            data
        };
        const {errors, response, fetching} = await repository.updateProductCategory(props.content.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            actions.setErrors(errors);
            return;
        }

        emit("hide-modal");
        emit("redirect-after");

        await store.dispatch("admin/setCategoriesResponseData", response);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    });
    return {
        isButtonLoading,
        multiSelectLoading,
        name,
        slug,
        parent,
        errors,
        options,
        onSubmit
    }
};
