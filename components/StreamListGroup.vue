<template>
  <v-container fluid v-if="streamers.length">
    <!--Streams divider-->
    <v-row class="mt-4 mb-2 d-flex align-center" style="width: 100%;">
      <v-divider class="ml-3" />
      <span class="mx-5 text-overline" :class="headerStyling"> {{$props.dividerTitle}} </span>
      <v-divider class="mr-3" />
    </v-row>

    <slot/>

    <!--Stream list-->
    <transition-group name="scroll-x-transition">
      <v-row justify="center" align="center" v-for="streamer in $props.streamers" :key="streamer.id">
        <streamer-entry :data="streamer" :live="streamer.live" class="my-3"></streamer-entry>
      </v-row>
    </transition-group>
  </v-container>
</template>

<script>
export default {
  props: [
      'streamers',
      'dividerTitle',
      'headerStyling'
  ],
  data() {
    return {
      init: true,
    }
  }
}
</script>
