<template>
    <vue3-chart-js
        v-bind="{...chartData}"
        ref="chartRef"
    />
</template>

<script>
    import {watch, ref} from "vue";
    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

    export default {
        name: 'AppChartLine',
        props: {
            chartSets: {
                type: [Object, Array],
                required: true
            }
        },
        components: {
            Vue3ChartJs,
        },
        setup(props) {
            const chartRef = ref(null);
            const MONTHS = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            const chartData = {
                type: 'line',
                data: {
                    labels: MONTHS,
                    datasets: [
                        ...props.chartSets
                    ],
                },
                options: {
                    plugins: {}
                }
            };

            watch(() => props.chartSets, value => {
                if (value)
                    chartRef.value.update();
            }, {deep: true});
            return {
                chartData, chartRef
            }
        },
    }
</script>
