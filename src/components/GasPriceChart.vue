<script>
    let tickVariants = {
        "7": 0,
        "30": 7,
        "90": 5
    };
    export default{
        props: {
            gasPriceData: Object
        },
        data(){
            return {
                segments: [7, 30, 90],
                currentSegment: 7,
                chartOptions: {
                    chart: {
                        id: 'test-chart',
                        type: 'line',
                        fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                        fontSize: '1rem',
                        foreColor: 'rgb(21, 2, 8)'
                    },
                    xaxis: {
                        categories: this.getDataArray('date', 7)
                    },
                    yaxis: {
                        max(mx) {
                            return mx + 2;
                        },
                        min(mn) {
                            return mn - 2;
                        }
                    },
                    colors: ['rgb(233, 30, 99)', 'rgb(156, 39, 176)', 'rgb(127, 175, 222)']
                },
                series: [
                {
                    name: 'High Price',
                    data: this.getDataArray('high', 7)
                },
                {
                    name: 'Average Price',
                    data: this.getDataArray('average', 7)
                },
                {
                    name: 'Low Price',
                    data: this.getDataArray('low', 7)
                }
                ]
            }
        },
        methods: {
            updateData(){
                this.chartOptions = {
                    xaxis: {
                        categories: this.getDataArray('date', this.currentSegment),
                        tickAmount: tickVariants[this.currentSegment]
                    }
                };
                this.series = [
                    {data: this.getDataArray('high', this.currentSegment)},
                    {data: this.getDataArray('average', this.currentSegment)},
                    {data: this.getDataArray('low', this.currentSegment)}
                ];
            },
            getDataArray(type, len) {
                if (type === 'date') return this.gasPriceData.data.map(item => item[type]).slice(-len);
                else return this.gasPriceData.data.map(item => item[type].average).slice(-len);
            }
        },
        watch: {
            gasPriceData(){
                this.updateData();
            }
        }
    }
</script>

<template>
    <div class="flex-column-center width-full">
        <div class="buttons-container width-full">
            <div class="buttons-wrapper">
                <button v-for="seg in segments"
                        :key="seg"
                        :id="seg"
                        :class="(currentSegment === seg? 'active-button' : '')"
                        @click="() => {
                            currentSegment = seg;
                            updateData();
                        }"
                >
                    {{ seg }}D
                </button>
            </div>
        </div>
        <apexchart class="width-full" :series="series" :options="chartOptions"></apexchart>
    </div>   
</template>

<style lang="scss">
@import '../scss/style.scss';
</style>