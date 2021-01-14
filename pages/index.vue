<template>
  <v-container fluid tag="div">
    <v-row justify="center">
      <v-col class="mt-n5 content" tag="v-card">
        <v-skeleton-loader
            type="list-item-avatar-two-line"
            :loading="loading"
            :elevation="0"
            dark
            :class="{'pt-5 mt-2': loading}"
            transition="fade-transition"
        >
          <v-container tag="div">
            <stream-list-group :streamers="online" divider-title="Online streams" header-styling="grey--text" class="mt-n5" />
            <stream-list-group :streamers="offline" divider-title="Offline streams" header-styling="accent--text" />
          </v-container>
        </v-skeleton-loader>
        <v-skeleton-loader v-for="i in 6" :key="i" type="list-item-avatar-two-line" v-if="loading" :elevation="0" />
      </v-col>
    </v-row>
    <v-card tag="div" class="pa-2 lastUpdated" @click="update" outlined>
      <v-skeleton-loader :loading="loading" type="text" width="200px">
        Last updated at {{lastUpdated}}
      </v-skeleton-loader>
    </v-card>
  </v-container>
</template>

<script>
import StreamListGroup from '~/components/StreamListGroup';

export default {
  components: {
    StreamListGroup
  },

  data() {
    return {
      streamer_data: [],
      lastUpdated: "",
      online: [],
      offline: [],
      loading: true,
      updateInterval: null,
    };
  },

  async mounted() {
    this.updateInterval = setInterval(this.update, 5 * 60 * 1000);
  },

  methods: {
    filterStreamers() {
      this.offline = [];
      this.online = [];

      this.streamer_data.forEach(x =>
          (x.live ? this.online : this.offline).push(x)
      );

      this.online.sort((l, r) => r.viewers - l.viewers);
    },

    async update() {
      try {
        this.streamer_data = await this.$axios.$get('https://api.jdanks.army/streams');
        this.filterStreamers();
        this.lastUpdated = new Date().toLocaleTimeString()
      } catch (e) {
        console.error(e);
      }
    }
  },

  async fetch() {
    await this.update();
    this.$nextTick(() => this.loading = false);
  },
}
</script>

<style scoped lang="scss">
  .content {
    max-width: 600px;
  }

  .lastUpdated {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
  }
</style>
