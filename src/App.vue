<template>
  <div id="app">
    <Grid :grid="grid" @click="handleCellClick" />
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

      for (let ii = 0; ii < this.gridWidth; ii++) {
        let subGrid = [];
        for (let jj = 0; jj < this.gridHeight; jj++) {
          subGrid.push({
            tile: 'NONE',
            coordinates: `${ii},${jj}`,
          });
        }

        grid.push(subGrid);
      }

      this.grid = grid;
    },

    handleCellClick(cell) {
      const coordinates = cell.coordinates.split(',');

      if (cell.tile === 'NONE') {
        this.grid[coordinates[0]][coordinates[1]].tile = 'WALL';
      } else if (cell.tile === 'WALL') {
        this.grid[coordinates[0]][coordinates[1]].tile = 'NONE';
      }
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
  background: #eee;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
