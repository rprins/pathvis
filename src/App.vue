<template>
  <div id="app">
    <div class="debug" v-if="showDebugger">
      startCell: {{ startCell }}<br />
      endCell: {{ endCell }} <br />
      <br />
      <span @click="dijkstra">Start Dijkstra</span>
      <br /><br />
      <span @click="init">Reset</span>
      <br /><br />
      <div>Result message: {{ resultMessage }}</div>
    </div>

    <Grid />
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
      showDebugger: false,
    };
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
