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
                        type: 'line'
                        
                    },
                    xaxis: {
                        categories: this.getDataArray('date', 7),
                        tickAmount: 7,
                        labels: {
                            rotate: 0,
                            style: {
                                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                fontSize: '1rem'
                            }
                        }
                    },
                    yaxis: {
                        max(mx) {
                            return mx + 2;
                        },
                        min(mn) {
                            return mn - 2;
                        },
                        tickAmount: 8,
                        labels: {
                            style: {
                                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                fontSize: '1rem'
                            }
                        }
                    },
                    legend: {
                        fontSize: '15rem',
                        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    },
                    tooltip: {
                        style: {
                            fontSize: '1rem',
                            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
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
        mounted() {
            window.addEventListener('resize', this.windowResize);
        },
        beforeDestroy() { 
            window.removeEventListener('resize', this.windowResize); 
        },
        methods: {
            updateData(){
                let newX = {
                    ...this.chartOptions.xaxis,
                    ...{
                        categories: this.getDataArray('date', this.currentSegment)
                    }
                };
                this.chartOptions = {...this.chartOptions,
                    ...{
                    xaxis: newX
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
            },
            windowResize() {
                let newX = {
                    ...this.chartOptions.xaxis,
                    ...{
                        tickAmount: (window.innerWidth <= 550 ? 3 : 7)
                    }
                };
                this.chartOptions = {...this.chartOptions,
                    ...{
                        xaxis: newX
                    }
                };
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
    <div class="flex-column-center width-full chart">
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
        <apexchart class="width-full" height="100%" :series="series" :options="chartOptions"></apexchart>
    </div>   
</template>

<style lang="scss">
@import '../scss/style.scss';
.chart {
    aspect-ratio: 1;
    @media (min-width: $breakpoint){
        aspect-ratio: 16 / 9;
    }
}
</style>