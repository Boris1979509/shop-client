<template>
    <div class="w-full my-5">
        <div class="flex justify-end">
            <ul class="flex bg-white p-2 gap-2 rounded border border-gray-200">
                <li>
				<span
                    v-if="isInFirstPage"
                    :class="['flex items-center w-10', classesFirstPage]"

                ><app-icon icon="arrow-narrow-left"/></span>
                    <a
                        v-else
                        @click.prevent="onClickFirstPage"
                        :class="['flex items-center w-10', classesFirstPage]"
                        href="#"
                        role="button"
                        rel="prev"
                    >
                        <app-icon icon="arrow-narrow-left"/>
                    </a>
                </li>
                <li class="pagination-item">
                    <button
                        type="button"
                        @click="onClickPreviousPage"
                        :disabled="isInFirstPage"
                        aria-label="Go to previous page"
                        :class="classesFirstPage"
                    >Previous
                    </button>
                </li>
                <li
                    v-for="page in pages"
                    :key="page.name"
                >
				<span
                    :class="['border-blue-600 bg-blue-600 text-white cursor-not-allowed', ...classMapActive]"
                    v-if="isPageActive(page.name)"
                >{{ page.name }}</span>
                    <a
                        v-else
                        :class="['border-gray-200 hover:bg-gray-200 text-gray-600', ...classMapActive]"
                        @click.prevent="onClickPage(page.name)"
                        role="button"
                        href="#"
                    >{{ page.name }}</a>
                </li>
                <li>
                    <button
                        type="button"
                        @click="onClickNextPage"
                        :disabled="isInLastPage"
                        aria-label="Go to next page"
                        :class="classesLastPage"
                    >Next
                    </button>
                </li>
                <li>
                <span
                    v-if="isInLastPage"
                    :class="['flex items-center w-10', classesLastPage]"
                ><app-icon icon="arrow-narrow-right"/></span>
                    <a
                        v-else
                        :class="['flex items-center w-10', classesLastPage]"
                        href="#"
                        @click.prevent="onClickLastPage"
                        rel="next"
                        role="button"
                    >
                        <app-icon icon="arrow-narrow-right"/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {computed, onMounted, onUpdated} from "vue";
    import {useRouter, useRoute} from "vue-router";

    export default {
        name: "AppPaginator",
        emits: ["pagechanged"],
        props: {
            maxVisibleButtons: {
                type: Number,
                required: false,
                default: 3
            },
            totalPages: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        setup(props, {emit}) {
            const route = useRoute();
            const router = useRouter();
            // Start page
            const startPage = computed(() => {
                if (props.currentPage === 1) {
                    return 1;
                }
                if (props.currentPage === props.totalPages) {
                    const total = props.totalPages - props.maxVisibleButtons + 1;
                    if (total)
                        return total;
                }
                return props.currentPage - 1;
            });
            // End page
            const endPage = computed(() => {
                return Math.min(
                    startPage.value + props.maxVisibleButtons - 1,
                    props.totalPages
                );
            });
            const pages = computed(() => {
                const range = [];
                for (let i = startPage.value; i <= endPage.value; i++) {
                    range.push({
                        name: i,
                        isDisabled: i === props.currentPage
                    });
                }
                return range;
            });
            const isInFirstPage = computed(() => props.currentPage === 1);
            const isInLastPage = computed(() => props.currentPage === props.totalPages);
            const classMap = [
                'rounded',
                'border',
                'border-gray-200',
                'px-3', 'py-2',
                'no-underline',
                'text-gray-600',
                'h-10',
            ];
            const classesFirstPage = computed(() => {
                return isInFirstPage.value ? [
                    ...classMap,
                    'cursor-not-allowed',
                ] : [...classMap, 'hover:bg-gray-200'];
            });
            const classesLastPage = computed(() => {
                return isInLastPage.value ? [
                    ...classMap,
                    'cursor-not-allowed',
                ] : [...classMap, 'hover:bg-gray-200'];
            });
            const classMapActive = [
                'relative',
                'block', 'h-10',
                'px-3', 'py-2', 'rounded',
                'border', 'no-underline'
            ];
            const routerPush = page => {
                if (+page === 1) {
                    router.push({name: route.name});
                } else {
                    router.push({name: route.name, query: {page: page}});
                }
            };
            const onClickFirstPage = () => {
                emit("pagechanged", 1);
                routerPush(1);
            };
            const onClickPreviousPage = () => {
                emit("pagechanged", props.currentPage - 1);
                routerPush(props.currentPage - 1);
            };
            const onClickPage = page => {
                emit("pagechanged", page);
                routerPush(page);
            };
            const onClickNextPage = () => {
                emit("pagechanged", props.currentPage + 1);
                routerPush(props.currentPage + 1);
            };
            const onClickLastPage = () => {
                emit("pagechanged", props.totalPages);
                routerPush(props.totalPages);
            };
            const isPageActive = page => {
                return props.currentPage === page;
            };
            onMounted(() => {
                const page = route.query.page;
                if (page !== undefined)
                    routerPush(page);
            });
            onUpdated(() => {
                routerPush(props.currentPage);
            });
            return {
                startPage,
                endPage,
                isInFirstPage,
                onClickFirstPage,
                onClickPreviousPage,
                onClickLastPage,
                isInLastPage,
                onClickNextPage,
                isPageActive,
                pages,
                onClickPage,
                classesFirstPage,
                classesLastPage,
                classMapActive
            }
        }
    }
</script>
