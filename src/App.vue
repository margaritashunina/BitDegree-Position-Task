<script>
import Tab from './components/Tab.vue';
  export default {
    name: 'App',
    components: {
    Tab
  },
    data() {
      return {
        networkList: [
          'Network1', 'Network2'
        ],
        selected: 'Network1'
      }
    },
    methods: {
      tabHandler(event) {
        this.selected = event.target.id;
      }
    }
  }
</script>
  
<template>
  <div class="flex-column-center">
    <main class="flex-column-center">
      <div class="buttons-container width-full">
        <div class="buttons-wrapper">
          <button v-for="item in networkList"
                  :key="item"
                  :id="item"
                  :class="(selected === item? 'active-button' : '')"
                  @click="tabHandler">
            {{ item }}
          </button>
        </div>
      </div>
      

      <Tab :network="selected"/>
    </main>
  </div>
</template>

<style lang="scss">
@import './scss/style.scss';
main {
  margin-block: 1rem;
  width: 100%;
  padding: 1rem;
  background-color: $background-color;

  @media (min-width: $breakpoint){
    width: 70%;
    max-width: 1100px;

    border-radius: $border-radius-size;
    border: solid thin $shadow-color;
    filter: drop-shadow(0 0 0.1rem $shadow-color);
  }
}
</style>
