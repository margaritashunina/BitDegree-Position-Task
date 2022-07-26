<script>
    export default {
        props: {
            type: String,
            value: Number,
            additionalInfo: Object
        }
    }
</script>

<template>
    <div class="flex-column-center gas-meter-card">
        <p :class="type + '-color'">{{ type.toUpperCase() }}</p>
        <p>{{ value }} gwei</p>
        <div class="add-info">
            <p v-for="(value, key) in additionalInfo">
                {{key}} {{value}}
            </p>
        </div>
    </div>
</template>

<style lang="scss">
@import '../scss/style.scss';
.gas-meter-card {
    border: solid thin $shadow-color;
    border-radius: 0.4rem;
    font-size: 2rem;

    aspect-ratio: 16 / 9;
    width: 100%;

    @media (min-width: $breakpoint){
        width: 33%;
    }
}

.add-info {
    @include flex-container(row, center);
    flex-wrap: wrap;

    p {
        color: $secondary-text-color;
        font-size: 1rem;
    }
}
</style>