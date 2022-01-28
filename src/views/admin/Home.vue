<template>
    <app-loader v-if="isLoading"/>
    <template v-else>
        <div class="container">
            <div class="grid grid-cols-12 gap-6 mt-5">
                <app-tag
                    v-if="issetTags('users')"
                    :icon="users.icon"
                    :label="users.label"
                    :count="users.count"
                    :route="users.route"
                >
                    <app-chart
                        :chartSets="users.chartSets"
                    />
                </app-tag>
                <app-tag
                    v-if="issetTags('products')"
                    :icon="products.icon"
                    :label="products.label"
                    :count="products.count"
                    :route="products.route"
                />
                <app-tag
                    v-if="issetTags('categories')"
                    :icon="categories.icon"
                    :label="categories.label"
                    :count="categories.count"
                    :route="categories.route"
                />
            </div>
        </div>
    </template>
</template>

<script>
    import AppChart from "@/components/ui/AppChartLine";
    import {useTags} from "@/use/tags";

    export default {
        name: "Home",
        setup() {
            return {...useTags()}
        },
        components: {
            AppChart
        }
    }
</script>
