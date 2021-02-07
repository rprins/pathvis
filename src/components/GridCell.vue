<template>
  <div
    :class="computedClass"
    @click.exact="$emit('click')"
    @click.ctrl.exact="$emit('ctrlClick')"
    @click.alt.exact="$emit('altClick')"
    @mouseover.exact="$emit('mouseover')"
  >
    <template v-if="debug">
      <template v-if="data.distance && data.distance !== 999999">
        {{ data.distance }}
        <small>{{ data.coordinates }}</small>
      </template>

      <small>{{ data.tile }}</small>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: {},
    },

    debug: {
      type: Boolean,
      default: false,
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

        case 'PATH':
          classes.push('GridCell--path');
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
  flex-direction: column;

  cursor: pointer;
  user-select: none;

  background: white;
  border: 1px solid #ccc;

  transition: background 300ms, border 300ms, color 300ms;

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

  &--path {
    background: blue;
    color: white;
    border: 1px solid blue;
  }
}
</style>
