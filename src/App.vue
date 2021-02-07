<template>
  <div id="app">
    <Grid
      :grid="grid"
      @click="handleCellClick"
      @ctrlClick="handleCellCtrlClick"
      @altClick="handleCellAltClick"
    />
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

      startCell: '',
      endCell: '',
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
      if (cell.tile === 'NONE') {
        cell.tile = 'WALL';
      } else if (cell.tile === 'WALL') {
        cell.tile = 'NONE';
      }
    },

    handleCellCtrlClick(cell) {
      cell.tile = 'START';

      if (this.startCell !== '') {
        this.resetCell(this.startCell.split(','));
      }

      this.startCell = cell.coordinates;
    },

    handleCellAltClick(cell) {
      cell.tile = 'END';

      if (this.endCell !== '') {
        this.resetCell(this.endCell.split(','));
      }

      this.endCell = cell.coordinates;
    },

    resetCell(coordinates) {
      this.grid[coordinates[0]][coordinates[1]].tile = 'NONE';
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
