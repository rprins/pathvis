<template>
  <div
    :class="computedClass"
    @click.exact="$emit('click')"
    @click.shift.exact="$emit('shiftClick')"
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
    background: #b92828;
    color: white;
    border: 1px solid #b92828;
  }

  &--end {
    background: #43c843;
    color: white;
    border: 1px solid #43c843;
  }

  &--path {
    background: #5cb3ff;
    color: white;
    border: 1px solid #5cb3ff;
  }
}
</style>
