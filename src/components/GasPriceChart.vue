<script>
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
                        foreColor: '#334155'
                    },
                    xaxis: {
                        categories: this.getDataArray('date', 7)
                    },
                    colors: ['#86efac', '#93c5fd', '#fca5a5']
                },
                series: [
                {
                    name: 'low-price',
                    data: this.getDataArray('low', 7)
                },
                {
                    name: 'average-price',
                    data: this.getDataArray('average', 7)
                },
                {
                    name: 'high-price',
                    data: this.getDataArray('high', 7)
                }
                ]
            }
        },
        methods: {
            updateData(){
                this.chartOptions = {
                    xaxis: {
                        categories: this.getDataArray('date', this.currentSegment)
                    }
                };
                this.series = [
                    {data: this.getDataArray('low', this.currentSegment)},
                    {data: this.getDataArray('average', this.currentSegment)},
                    {data: this.getDataArray('high', this.currentSegment)}
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
    <div class="flex-column-center chart">
        <div class="flex-row-end width-full">
            <button v-for="seg in segments"
                    :key="seg"
                    :id="seg"
                    :class="(currentSegment === seg? 'active-button' : '')"
                    @click="() => {
                        currentSegment = seg;
                        updateData();
                    }"
            >
                {{ seg }} days
            </button>
        </div>
        <apexchart class="width-full" :series="series" :options="chartOptions"></apexchart>
    </div>   
</template>

<style lang="scss">
@import '../scss/style.scss';

.chart {
    width: 90%;
}

@media (min-width: $breakpoint){
    .chart {
        width: 50%;
    }
}
</style>