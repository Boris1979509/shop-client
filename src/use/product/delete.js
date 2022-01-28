import {ref} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";

export const useProductDelete = (props, emit) => {
    const isButtonLoading = ref(false);
    const store = useStore();

    const deleteProduct = async () => {
        store.commit("admin/SET_PRODUCTS", null); // for loader
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'delete'
        };
        const {errors, response, fetching} = await repository.deleteProduct(props.content.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            console.log(errors);
            return;
        }
        emit('hide-modal');
        emit('redirect-after');
        store.commit("admin/SET_PRODUCTS", response.products);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    };
    return {deleteProduct, isButtonLoading}
};
