<template>
  <div>
    <div class="d-flex align-center">
      <h4 class="grey--text overline">Choice quote:</h4>
      <v-divider class="flex-grow-1 ml-2"/>
    </div>
    <div class="d-flex text-center font-italic">
      <div class="secondary left"/>
      <blockquote class="flex-grow-1 grey--text">{{quote}}</blockquote>
    </div>
  </div>
</template>

<script>
  import quotes from '@/assets/quotes.json';

  export default {
    name: "RandomQuote",
    data() {
      return {
        quote: "s",
      };
    },
    mounted() {
      this.quote = quotes[Math.round(Math.random() * (quotes.length - 1))];
    }
  }
</script>

<style scoped lang="scss">
  .left { width: 12px; }
  blockquote {
    position: relative;
    padding: 1rem 1.2rem;
    width: 80%;

    &::before, &::after {
      font-size: 34px;
      position: absolute;
    }

    &::before {
      content: "“";
      left: 2px;
      top: 2px;
    }

    &::after {
      content: "”";
      right: 8px;
      bottom: -20px;
      top: auto;
    }
  }
</style>
