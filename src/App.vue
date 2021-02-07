<template>
  <div id="app">
    <div class="debug">
      startCell: {{ startCell }}<br />
      endCell: {{ endCell }} <br />
    </div>

    <Grid
      :grid="grid"
      :mouse-down="mouseDown"
      @click="handleCellClick"
      @ctrlClick="handleCellCtrlClick"
      @altClick="handleCellAltClick"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
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

      mouseDown: false,
      mouseDownInitialCellTile: '',
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

      this.setStartCell(grid[9][2]);
      this.setEndCell(grid[9][17]);

      this.grid = grid;
    },

    handleCellClick(cell) {
      if (this.mouseDown && this.mouseDownInitialCellTile === '') {
        this.mouseDownInitialCellTile =
          cell.tile === 'WALL' ? 'NONE' : 'WALL';
      }

      if (
        this.mouseDownInitialCellTile !== '' &&
        cell.tile != 'START' &&
        cell.tile != 'END'
      ) {
        cell.tile = this.mouseDownInitialCellTile;
      } else if (cell.tile === 'NONE') {
        cell.tile = 'WALL';
      } else if (cell.tile === 'WALL') {
        cell.tile = 'NONE';
      }
    },

    handleCellCtrlClick(cell) {
      /*
        if startCell exists and you click the same cell: set cell to NONE and reset startCell
        if startCell exists and you click a different cell: and set cell to START and set startCell to new coordinates
        if startCell does not exist: set cell to START and set startCell to new coordinates
      */
      if (this.startCell !== '') {
        this.resetCell(this.startCell.split(','));

        if (this.startCell === cell.coordinates) {
          this.startCell = '';
        } else {
          this.setStartCell(cell);
        }
      } else {
        this.setStartCell(cell);
      }
    },

    handleCellAltClick(cell) {
      /*
        if endCell exists and you click the same cell: set cell to NONE and reset endCell
        if endCell exists and you click a different cell: and set cell to END and set endCell to new coordinates
        if endCell does not exist: set cell to END and set endCell to new coordinates
      */
      if (this.endCell !== '') {
        this.resetCell(this.endCell.split(','));

        if (this.endCell === cell.coordinates) {
          this.endCell = '';
        } else {
          this.setEndCell(cell);
        }
      } else {
        this.setEndCell(cell);
      }
    },

    resetCell(coordinates) {
      this.grid[coordinates[0]][coordinates[1]].tile = 'NONE';
    },

    setStartCell(cell) {
      cell.tile = 'START';
      this.startCell = cell.coordinates;
    },

    setEndCell(cell) {
      cell.tile = 'END';
      this.endCell = cell.coordinates;
    },

    handleMouseDown() {
      this.mouseDown = true;
    },

    handleMouseUp() {
      this.mouseDown = false;
      this.mouseDownInitialCellTile = '';
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

  display: grid;
  grid-template-rows: repeat(100px, auto);
  justify-content: center;
}

.debug {
  align-self: center;
  text-align: left;
}
</style>
