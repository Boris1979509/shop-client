import {ref} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";

export const useProductImageDelete = (props, emit) => {
    const store = useStore();
    const isButtonLoading = ref(false);

    const deleteProductImage = async () => {
        isButtonLoading.value = true;
        props.content.currentTarget.disabled = true;
        props.content.currentTarget.classList.add("disabled");
        props.content.currentTarget.closest("div").classList.add("opacity-50");

        const config = { // config fetch
            method: 'delete'
        };

        const {errors, response, fetching} = await repository
            .deleteProductImage(props.content.product_id, props.content.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            console.log(errors);
            return;
        }
        emit('hide-modal');
        emit('update-images', props.content.id);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    };
    return {deleteProductImage, isButtonLoading}
};
