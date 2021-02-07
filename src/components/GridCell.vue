<template>
  <div
    :class="computedClass"
    @click.exact="$emit('click')"
    @click.ctrl.exact="$emit('ctrlClick')"
    @click.alt.exact="$emit('altClick')"
  >
    {{ data.coordinates }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: {},
    },
  },

  computed: {
    computedClass() {
      let classes = ['GridCell'];

      switch (this.data.tile) {
        case 'WALL':
          classes.push('GridCell--wall');
          break;

        case 'START':
          classes.push('GridCell--start');
          break;

        case 'END':
          classes.push('GridCell--end');
          break;
      }

      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
.GridCell {
  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
  border: 1px solid #ccc;

  &--wall {
    background: black;
    color: white;
    border: 1px solid black;
  }

  &--start {
    background: red;
    color: white;
    border: 1px solid red;
  }

  &--end {
    background: green;
    color: white;
    border: 1px solid green;
  }
}
</style>
