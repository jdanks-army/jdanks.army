<template>
  <v-container tag="div">
    <span class="mr-n1" :style="bracket">[</span>
    <span :style="jdanks">JDANKS</span>
    <sup class="mb-2" :style="army">army</sup>
    <span class="ml-n1" :style="bracket">]</span>
  </v-container>
</template>

<script>
export default {
  name: "Logo",
  props: {
    scale: {
      type: Number,
      default: 1.4,
      required: false,
    },
  },
  computed: {
    jdanks() {
      return `
          font-family: 'Permanent Marker', cursive;
          font-size: calc(15pt * ${this.scale});
        `;
    },
    army() {
      return `
          font-family: 'Playfair Display', serif;
          font-size: calc(8pt * ${this.scale});
        `;
    },
    bracket() {
      return `
          font-size: calc(15pt * ${this.scale});
        `;
    },
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Playfair+Display&display=swap');
</style>
