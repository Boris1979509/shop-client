import {ref} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";

export const useProductCategoryDelete = (props, emit) => {
    const isButtonLoading = ref(false);
    const store = useStore();

    const deleteCategory = async () => {
        store.commit("admin/SET_CATEGORIES", null);
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'delete'
        };
        const {errors, response, fetching} = await repository.deleteProductCategory(props.content.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            console.log(errors);
            return;
        }
        emit('hide-modal');
        emit('redirect-after');
        await store.dispatch("admin/setCategoriesResponseData", response);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    };
    return {deleteCategory, isButtonLoading}
};
