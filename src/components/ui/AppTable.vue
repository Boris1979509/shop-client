<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-2">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-2">
                <div class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                v-for="(item, idx) in theadTable"
                                :key="idx"
                                v-text="item"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            >
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr
                            v-for="(item, idx) in data"
                            :key="item.id"
                            :class="[idx % 2 ? 'bg-gray-50' : '']"
                        >
                            <td
                                v-for="(field, idx) in tbodyTable"
                                :key="idx"
                                :class="[field === 'images' ? 'px-2' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-500']"
                            >
                                <app-badge
                                    v-if="isFieldBadge(field)"
                                    :type="item[field] === 'active' ? 'success' : 'primary'"
                                    :label="item[field]"
                                />
                                <template v-else-if="convertArrayFrom(item[field], field)">
                                    <app-badge
                                        v-for="(newVal, idx) in newArr"
                                        :key="idx"
                                        :class="{'ml-2': idx > 0}"
                                        :label="newVal"
                                    />
                                </template>
                                <template v-else-if="field === 'images'">
                                    <app-circle-image
                                        v-for="image in item[field]"
                                        :src="image.full_path"
                                        :alt="image.name"
                                        :key="image.id"
                                    />
                                </template>
                                <template v-else-if="field === 'enabled'">
                                    <app-badge
                                        :type="/^yes$/i.test(item[field]) ? 'success' : 'danger'"
                                        :label="item[field]"
                                    />
                                </template>
                                <template
                                    v-else
                                >{{ item[field] }}
                                </template>
                            </td>
                            <td v-if="actions">
                                <div class="px-6 py-4 flex gap-2 items-center">
                                    <app-button
                                        class="text-sm"
                                        @click="$emit('show-details-item', item.id)"
                                    >
                                        Details
                                    </app-button>
                                    <app-button
                                        :class="{'disabled': item?.deleted_at}"
                                        :disabled="item?.deleted_at"
                                        @click="$emit('delete-item', item)"
                                        color="danger"
                                        class="text-sm"
                                    >
                                        Delete
                                    </app-button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {computed} from "vue";
    import AppCircleImage from "@/components/ui/AppCircleImage";

    export default {
        name: "AppTable",
        components: {AppCircleImage},
        emits: ["show-details-item", "delete-item"],
        props: {
            theadTable: {
                type: Array,
                required: true
            },
            tbodyTable: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true
            },
            fieldBadge: {
                type: Array,
                default() {
                    return [];
                }
            },
            mapFields: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        setup(props) {
            const actions = computed(() => props.theadTable.includes("actions"));
            const newArr = [];

            const convertArrayFrom = (value, field) => {
                if (Array.isArray(value) && props.mapFields[field]) {
                    newArr.splice(0);
                    value.forEach((item, i) => newArr[i] = item[props.mapFields[field]]);
                    return true;
                }
                return false;
            };
            const isFieldBadge = field => {
                return props.fieldBadge.length && props.fieldBadge.includes(field);
            };

            return {actions, isFieldBadge, convertArrayFrom, newArr}
        }
    }
</script>
