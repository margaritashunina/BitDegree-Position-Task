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
  <main class="flex-column-center">
    <div class="flex-row-center width-full">
      <button v-for="item in networkList"
              :key="item"
              :id="item"
              :class="(selected === item? 'active-button' : '')"
              @click="tabHandler">
        {{ item }}
      </button>
    </div>

    <Tab :network="selected"/>
  </main>
</template>

<style lang="scss">
main {
  margin-block: 1rem;
  width: 100%;
}
</style>
