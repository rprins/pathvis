<template>
  <div :class="computedClass" @click="$emit('click')">
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

      if (this.data.tile === 'WALL') {
        classes.push('GridCell--wall');
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
}
</style>
