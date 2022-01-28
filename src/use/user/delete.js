import {ref} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";

export const useUserDelete = (props, emit) => {
    const isButtonLoading = ref(false);
    const store = useStore();

    const deleteUser = async () => {
        isButtonLoading.value = true;
        const config = { // config fetch
            method: 'delete'
        };
        const {errors, response, fetching} = await repository.deleteUser(props.content.id, config);
        isButtonLoading.value = fetching;
        if (errors) {
            console.log(errors);
            return;
        }
        emit('hide-modal');
        emit('redirect-after');
        store.commit('admin/SET_USERS', response.users);
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    };
    return {deleteUser, isButtonLoading}
};
