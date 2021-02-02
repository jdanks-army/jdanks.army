<template>
  <v-container fluid v-if="streamers.length">
    <!--Streams divider-->
    <stream-list-header :header-styling="headerStyling" :divider-title="dividerTitle"/>

    <slot/>

    <!--Stream list-->
    <transition-group name="scroll-x-transition">
      <v-row justify="center" align="center" v-for="streamer in $props.streamers" :key="streamer.id">
        <streamer-entry :data="streamer" :live="streamer.live" class="my-3"/>
      </v-row>
    </transition-group>
  </v-container>
</template>

<script>
import StreamListHeader from "./StreamListHeader";

export default {
  components: {StreamListHeader},
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

