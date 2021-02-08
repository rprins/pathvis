<template>
  <div
    class="Grid"
    :style="styleObject"
    @mousedown="$emit('mousedown')"
    @mouseup="$emit('mouseup')"
  >
    <GridCell
      :data="gridCell"
      v-for="gridCell in flatGrid"
      :key="`Grid__cell__(${gridCell.coordinates})`"
      @click="$emit('click', gridCell)"
      @ctrlClick="$emit('ctrlClick', gridCell)"
      @altClick="$emit('altClick', gridCell)"
      @mouseover="handleMouseOver(gridCell)"
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
        gridTemplateColumns: `repeat(${this.gridWidth}, 20px)`,
        gridTemplateRows: `repeat(${this.gridHeight}, 20px)`,
      };
    },
  },

  methods: {
    handleMouseOver(cell) {
      if (this.mouseDown) {
        this.$emit('click', cell);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Grid {
  display: grid;
  // grid-template-columns: repeat(50, 20px);
  // grid-template-rows: repeat(20, 20px);
}
</style>
