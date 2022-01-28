import {useStore} from "vuex";

export default {
    transformArray(array) {
        return array.map(item => ({
                value: item.id,
                label: item.name.padStart(item.depth + item.name.length, '—')
            }
        ));
    },
    async get() {
        const store = useStore();
        if (!store.getters["admin/parentCategories"]) {
            await store.dispatch("admin/setParentCategories");
        }
        const data = store.getters["admin/parentCategories"];
        if (data) {
            return this.transformArray(data);
        }
    }
}
