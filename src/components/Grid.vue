<template>
  <div
    class="Grid"
    :style="styleObject"
    @mousedown.exact="$emit('mousedown', $event)"
    @mouseup.exact="$emit('mouseup')"
  >
    <GridCell
      :data="gridCell"
      v-for="gridCell in flatGrid"
      :key="`Grid__cell__(${gridCell.coordinates})`"
      @click="$emit('click', gridCell)"
      @shiftClick="$emit('shiftClick', gridCell)"
      @altClick="$emit('altClick', gridCell)"
    />
  </div>
</template>

<script>
import GridCell from '@/components/GridCell.vue';

export default {
  components: {
    GridCell,
  },

  props: {
    grid: {
      type: Array,
      required: true,
    },

    gridWidth: {
      type: Number,
      required: true,
    },

    gridHeight: {
      type: Number,
      required: true,
    },

    gridSize: {
      type: Number,
      required: true,
    },

    mouseDown: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    flatGrid() {
      let grid = [];
      this.grid.forEach(gridRow => {
        gridRow.forEach(gridCell => {
          grid.push(gridCell);
        });
      });

      return grid;
    },

    styleObject() {
      return {
        gridTemplateColumns: `repeat(${this.gridWidth}, auto)`,
        gridTemplateRows: `repeat(${this.gridHeight}, auto)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.Grid {
  height: 100vh;
  width: 100vw;
  display: grid;
}
</style>
