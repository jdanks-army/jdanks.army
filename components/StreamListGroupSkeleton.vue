<template>
  <v-container fluid class="px-0">
    <!--Streams divider-->
<!--    <stream-list-header :header-styling="headerStyling" :divider-title="dividerTitle"/>-->

    <slot/>

    <!--Stream list skeleton loader-->
      <v-card elevation="6" height="60" v-for="i in 5" :key="i">
        <v-skeleton-loader
            class="my-3 px-0"
            type="list-item-avatar-two-line"
            :loading="true"
            style="height: 60px; padding-bottom: 20px; margin-left: 0 !important; margin-right: 0 !important;"
        />
      </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StreamListGroupSkeleton",
  props: ['dividerTitle', 'headerStyling']
}
</script>

<style lang="scss">

  .v-skeleton-loader__bone {
    padding-bottom: 8px !important;
  }
</style>
