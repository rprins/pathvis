<template>
  <div id="app">
    <Grid :grid="grid" />
  </div>
</template>

<script>
import Grid from '@/components/Grid.vue';
export default {
  name: 'App',

  components: {
    Grid,
  },

  data() {
    return {
      gridWidth: 20,
      gridHeight: 20,
      grid: [],
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let grid = [];
      const subGrid = [];
      for (let ii = 0; ii < this.gridWidth; ii++) {
        subGrid.push('null');
      }
      for (let ii = 0; ii < this.gridHeight; ii++) {
        grid.push(subGrid);
      }

      this.grid = grid;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
