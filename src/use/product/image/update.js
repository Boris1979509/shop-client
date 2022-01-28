import {ref} from "vue";
import {useStore} from "vuex";
import repository from "@/api/repository";

export const useProductImageUpdate = props => {
    const store = useStore();
    const images = ref(props.product.images);

    /** Sorting after dragging */
    const sortImages = async () => {
        images.value.map((item, idx) => item.order = idx + 1);
        await fetch();
    };

    /** Filter images store after deletion */
    const updateImages = async id => {
        images.value = images.value.filter(item => item.id !== id);
        await sortImages();
    };
    const fetch = async () => {
        if (!images.value.length) return;

        const config = { // config fetch
            method: 'put',
            data: {images: images.value}
        };
        const {errors, response} = await repository
            .updateProductImage(props.product.id, config);
        if (errors) {
            console.log(errors);
            return;
        }
        await store.dispatch('notifications/setNotify', {
            message: response.message,
            type: 'success'
        }); // notify
    };

    return {updateImages, sortImages, images}
};
