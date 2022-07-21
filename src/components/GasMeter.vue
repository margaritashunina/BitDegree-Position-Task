<script>
    export default {
        props: {
            type: String,
            value: Number,
        }
    }
</script>

<template>
    <div class="flex-column-center gas-meter-card">
        <p :class="type + '-color'">{{ type.toUpperCase() }}</p>
        <p>{{ value }} gwei</p>
    </div>
</template>

<style lang="scss">
@import '../scss/style.scss';

.gas-meter-card {
    aspect-ratio: 16 / 9;
    border: solid thin $slate-300;
    border-radius: 0.4rem;
    font-size: 2rem;
    width: 80%;
}

@media (min-width: $breakpoint){
    .gas-meter-card {
        width: 20%;
    }
}
</style>