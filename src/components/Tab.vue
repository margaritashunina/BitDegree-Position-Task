<script>
    import GasMeter from "./GasMeter.vue";
    import GasPriceChart from "./GasPriceChart.vue";

    export default {
        props: {
            network: String
        },
        components: { 
            GasMeter, 
            GasPriceChart 
        },
        data() {
            return {
                priceTypes: ['low', 'average', 'high'],
                priceCurrent: null,
                priceHistory: null
            };
        },
        methods: {
            async getPrices(){
                await import('../assets/' + this.network + '/PriceCurrent.json').then((obj) => {
                    this.priceCurrent = obj.data;
                });
                await import('../assets/' + this.network + '/PriceHistory.json').then((obj) => {
                    this.priceHistory = obj;
                })
            }
        },
        async created() {
            this.getPrices();
        },
        watch: {
            async network(newNetwork, oldNetwrok){
                if (newNetwork === oldNetwrok) return;
                this.getPrices();
            }
        }
    }
</script>

<template>
    <div class="flex-column-center width-full">
        <div class="gas-meter-container width-full">
            <GasMeter v-for="tp in priceTypes" v-if="priceCurrent" :type="tp" :value="priceCurrent[tp]"/>
        </div>
        <GasPriceChart v-if="priceHistory" :gasPriceData="priceHistory"/>
    </div>
</template>

<style lang="scss">
@import '../scss/style.scss';
.gas-meter-container {
    @include flex-container(column, center);
}

@media (min-width: $breakpoint){
    .gas-meter-container {
        @include flex-container(row, center);
    }
}
</style>