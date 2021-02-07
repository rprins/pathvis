<template>
  <div class="Grid">
    <GridCell
      :data="gridCell"
      v-for="gridCell in flatGrid"
      :key="`Grid__cell__(${gridCell.coordinates})`"
      @click="$emit('click', gridCell)"
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
};
</script>

<style lang="scss" scoped>
.Grid {
  display: grid;
  grid-template-columns: repeat(20, 50px);
  grid-template-rows: repeat(20, 50px);
  // align-content: center;
  // align-items: center;
  // justify-content: center;
}
</style>
