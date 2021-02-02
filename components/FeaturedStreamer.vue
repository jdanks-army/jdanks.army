<template>

  <v-container fluid>

    <stream-list-header class="rainbow mt-auto" divider-title="featured stream"/>

    <streamer-entry :data="streamer" :live="streamer.live" :unread="true" class="my-5 featured">
      <div v-for="i in 3" class="ring-animation" :style="`animation-delay: ${0.2 * i}s;`"/>
    </streamer-entry>

  </v-container>

</template>

<script>
import StreamListHeader from "./StreamListHeader";
import StreamerEntry from "./StreamerEntry";
export default {
  components: {StreamListHeader, StreamerEntry},
  name: "FeaturedStreamer",
  props: ["streamer"]
}
</script>

<style scoped lang="scss">
  .rainbow {
    background-image: repeating-linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red, violet);
    background-size: 800% 800%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow 6s ease-in-out 0s infinite alternate;
  }

  @keyframes rainbow {
    0% {
      background-position: 15% 50%;
    }
    50% {
      background-position: 100% 25%;
    }
    100% {
      background-position: 15% 50%;
    }
  }

  .ring-animation {
    border: solid #26a69a 1px;
    border-radius: 3px;

    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0;
  }

  .featured {
    &:not(:hover) > .ring-animation {
      animation: ring-out 2s ease-in-out 0s infinite normal forwards;
    }
    &:hover > .ring-animation {
      animation: fade-in 100ms ease-in-out 0s 1 normal forwards;
    }
  }

  @keyframes fade-in {
    to, from { border-color: #777 }
    to { opacity: 1 }
  }

  @keyframes ring-out {
    from, 5%, 95% {
      transform: scale(1);
      opacity: 1;
    }

    25%, 95% {
      opacity: 0;
      transform: scaleX(1.1) scaleY(1.5);
    }
  }
</style>
