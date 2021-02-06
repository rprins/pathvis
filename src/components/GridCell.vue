<template>
  <div class="GridCell">
    {{ type }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.GridCell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
