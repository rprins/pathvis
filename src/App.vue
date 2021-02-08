<template>
  <div id="app">
    <div class="debug">
      startCell: {{ startCell }}<br />
      endCell: {{ endCell }} <br />
      <br />
      <span @click="dijkstra">Start Dijkstra</span>
      <br /><br />
      <span @click="init">Reset</span>
      <br /><br />
      <div>Result message: {{ resultMessage }}</div>
    </div>

    <Grid
      :grid="grid"
      :grid-width="gridWidth"
      :grid-height="gridHeight"
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
      gridWidth: 50,
      gridHeight: 20,
      grid: [],

      startCell: '',
      endCell: '',

      mouseDown: false,
      mouseDownInitialCellTile: '',

      resultMessage: '',

      pathDrawSpeed: 25,

      drawing: false,
      abortDrawing: false,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let grid = [];

      for (let yy = 0; yy < this.gridHeight; yy++) {
        let subGrid = [];
        for (let xx = 0; xx < this.gridWidth; xx++) {
          subGrid.push({
            tile: 'NONE',
            coordinates: `${xx},${yy}`,
            unvisited: true,
            distance: 999999,
          });
        }

        grid.push(subGrid);
      }

      this.grid = grid;

      this.setStartCell(
        this.getCell(4, Math.floor(this.gridHeight / 2)),
      );
      this.setEndCell(
        this.getCell(
          this.gridWidth - 5,
          Math.floor(this.gridHeight / 2),
        ),
      );

      this.dijkstra();
    },

    handleCellClick(cell) {
      this.removePath();

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

      if (this.drawing) {
        this.abortDrawing = true;
        return;
      }

      if (!this.mouseDown) {
        this.dijkstra();
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
      this.getCell(coordinates[0], coordinates[1]).tile = 'NONE';
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

    getCell(x, y) {
      return this.grid[y][x];
    },

    dijkstra() {
      /*
        Let the node at which we are starting be called the initial node. Let the distance of node Y be the distance from the initial node to Y. Dijkstra's algorithm will assign some initial distance values and will try to improve them step by step.

        1. Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
        2. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. Set the initial node as current.[16]
        3. For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the current assigned value and assign the smaller one. For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.
        4. When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and remove it from the unvisited set. A visited node will never be checked again.
        5. If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.
        6. Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new "current node", and go back to step 3.
        7. When planning a route, it is actually not necessary to wait until the destination node is "visited" as above: the algorithm can stop once the destination node has the smallest tentative distance among all "unvisited" nodes (and thus could be selected as the next "current").
      */
      if (this.startCell === '') return;

      const DISTANCE = 999999;

      let unvisited = [];
      this.grid.forEach(gridRow => {
        let subGrid = [];
        gridRow.forEach(gridCell => {
          let newCell = Object.assign({}, gridCell);
          newCell.unvisited = gridCell.tile !== 'WALL';
          newCell.distance = DISTANCE;
          subGrid.push(newCell);
        });
        unvisited.push(subGrid);
      });

      const startCoordinates = this.startCell.split(',');
      let x = parseInt(startCoordinates[0]);
      let y = parseInt(startCoordinates[1]);
      let current = unvisited[y][x];
      current.distance = 0;

      const calculateDistance = (current, x, y) => {
        let top = null;
        let right = null;
        let bottom = null;
        let left = null;

        if (y - 1 > -1) top = unvisited[y - 1][x];
        if (x + 1 < this.gridWidth) right = unvisited[y][x + 1];
        if (y + 1 < this.gridHeight) bottom = unvisited[y + 1][x];
        if (x - 1 > -1) left = unvisited[y][x - 1];

        if (top && top.unvisited) {
          let newDistance = current.distance + 1;
          if (newDistance < top.distance) {
            top.distance = newDistance;
          }
        }
        if (right && right.unvisited) {
          let newDistance = current.distance + 1;
          if (newDistance < right.distance) {
            right.distance = newDistance;
          }
        }
        if (bottom && bottom.unvisited) {
          let newDistance = current.distance + 1;
          if (newDistance < bottom.distance) {
            bottom.distance = newDistance;
          }
        }
        if (left && left.unvisited) {
          let newDistance = current.distance + 1;
          if (newDistance < left.distance) {
            left.distance = newDistance;
          }
        }

        current.unvisited = false;

        if (current.coordinates !== this.endCell) {
          let smallestDistance = 999999;
          let newCurrent = false;
          unvisited.forEach((gridRow, yy) => {
            gridRow.forEach((gridCell, xx) => {
              if (
                gridCell.unvisited &&
                gridCell.distance < smallestDistance
              ) {
                newCurrent = true;
                smallestDistance = gridCell.distance;
                current = gridCell;
                x = xx;
                y = yy;
              }
            });
          });

          if (newCurrent) {
            calculateDistance(current, x, y);
          } else {
            this.resultMessage = 'No path found';
            console.log(this.resultMessage);
          }

          this.$nextTick(() => {
            this.grid = unvisited;
          });
        } else {
          this.resultMessage = `Distance to endCell is ${current.distance}`;
          console.log(this.resultMessage);

          this.$nextTick(() => {
            this.grid = unvisited;
            this.calculatePath(unvisited);
          });
        }
      };

      calculateDistance(current, x, y);
    },

    calculatePath(grid) {
      let path = [];
      let currentDistance = 0;

      const endCellCoordinates = this.endCell.split(',');
      let current =
        grid[parseInt(endCellCoordinates[1])][
          parseInt(endCellCoordinates[0])
        ];

      const loop = (grid, current) => {
        currentDistance = current.distance;
        if (currentDistance < 2) return;

        const coordinates = current.coordinates.split(',');
        let x = parseInt(coordinates[0]);
        let y = parseInt(coordinates[1]);

        // Find neighbour node where node.distance === current.distance - 1
        let top = null;
        let right = null;
        let bottom = null;
        let left = null;

        if (y - 1 > -1) top = grid[y - 1][x];
        if (x + 1 < this.gridWidth) right = grid[y][x + 1];
        if (y + 1 < this.gridHeight) bottom = grid[y + 1][x];
        if (x - 1 > -1) left = grid[y][x - 1];

        let smallestDistance = currentDistance;
        if (
          top &&
          top.distance < smallestDistance &&
          top.tile !== 'WALL'
        ) {
          smallestDistance = top.distance;
          current = top;
        } else if (
          right &&
          right.distance < smallestDistance &&
          right.tile !== 'WALL'
        ) {
          smallestDistance = right.distance;
          current = right;
        } else if (
          bottom &&
          bottom.distance < smallestDistance &&
          bottom.tile !== 'WALL'
        ) {
          smallestDistance = bottom.distance;
          current = bottom;
        } else if (
          left &&
          left.distance < smallestDistance &&
          left.tile !== 'WALL'
        ) {
          smallestDistance = left.distance;
          current = left;
        }

        // Add node to path
        path.push(current);

        loop(grid, current);
      };

      loop(grid, current);

      path = path.reverse();

      this.drawPath(path);
    },

    async drawPath(path) {
      let newGrid = this.grid;

      this.drawing = true;

      for (let ii = 0; ii < path.length; ii++) {
        if (this.abortDrawing) {
          this.abortDrawing = false;
          this.drawing = false;
          this.dijkstra();
          break;
        }
        let cell = path[ii];
        const splitCoordinates = cell.coordinates.split(',');
        newGrid[splitCoordinates[1]][splitCoordinates[0]].tile =
          'PATH';

        this.$nextTick(() => {
          this.grid = newGrid;
        });

        await this.sleep(this.pathDrawSpeed);
      }

      this.abortDrawing = false;
      this.drawing = false;
    },

    removePath() {
      this.grid.forEach(gridCol => {
        gridCol.forEach(gridCell => {
          gridCell.tile =
            gridCell.tile === 'PATH' ? 'NONE' : gridCell.tile;
        });
      });
    },

    sleep(timeInMs) {
      return new Promise(resolve => {
        setTimeout(resolve, timeInMs);
      });
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
