<template>
  <div
    class="Grid"
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
      return {};
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
  grid-template-columns: repeat(20, 50px);
  grid-template-rows: repeat(20, 50px);
}
</style>
