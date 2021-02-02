<template>
  <v-row class="d-flex align-center mt-4 mb-3 px-5" style="min-width: 100%;">
    <v-divider/>
    <span class="text-overline flex-shrink-1 mx-3" :class="headerStyling"> {{$props.dividerTitle}} </span>
    <v-divider/>
  </v-row>
</template>

<script>
export default {
  name: 'StreamListHeader',
  props: {
    headerStyling: {
      type: String,
      required: false,
      default: ""
    },
    dividerTitle: {
      type: String,
      required: true,
    }
  }
}
</script>
