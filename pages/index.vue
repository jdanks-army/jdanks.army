<template>
  <v-container fluid tag="div">
    <link href='https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Playfair+Display&display=swap'
          rel='stylesheet' type='text/css'>
    <link rel="prefetch" href="https://api.jdanks.army/streams">

    <v-row justify="center">
      <v-col class="mt-n5 content" tag="v-card">
        <v-container tag="div" class="mt-3">
          <v-expand-transition>
            <featured-streamer v-if="featuredStreamer" :streamer="featuredStreamer" key="2"/>
          </v-expand-transition>

          <stream-list-header header-styling="grey--text" divider-title="Online streams" class="mt-n1 mb-n1"/>
          <transition name="scroll-x-transition" mode="out-in">
            <stream-list-group-skeleton v-if="$fetchState.pending" key="0"/>
            <stream-list-group :streamers="online" v-else key="1"/>
          </transition>

          <stream-list-header header-styling="accent--text" divider-title="Offline streams" class="mt-5 mb-n1"/>
          <transition name="scroll-x-transition" mode="out-in">
            <stream-list-group-skeleton v-if="$fetchState.pending" key="0"/>
            <stream-list-group :streamers="offline" v-else key="1"/>
          </transition>

          <random-quote class="ma-0 pa-0 mt-4"/>
        </v-container>
      </v-col>
    </v-row>

    <v-card tag="div" class="pa-2 lastUpdated" @click="update" outlined>
      <v-skeleton-loader :loading="$fetchState.pending" type="text" width="200px">
        Last updated {{ lastUpdatedString }}
      </v-skeleton-loader>
    </v-card>

  </v-container>
</template>

<script>
import StreamListGroup from '~/components/StreamListGroup';
import StreamerEntry from "../components/StreamerEntry";
import FeaturedStreamer from "../components/FeaturedStreamer";
import StreamListGroupSkeleton from "../components/StreamListGroupSkeleton";
import StreamListHeader from "../components/StreamListHeader";
import RandomQuote from "../components/RandomQuote";

export default {
  components: {
    RandomQuote,
    StreamListGroupSkeleton,
    FeaturedStreamer,
    StreamerEntry,
    StreamListHeader,
    StreamListGroup
  },

  data() {
    return {
      streamer_data: [],
      lastUpdatedString: "never",
      lastUpdated: null,

      featuredStreamer: null,

      online: [],
      offline: [],

      updateInterval: null,
      lastUpdatedTextInterval: null,
    };
  },

  fetchOnServer: false,

  async mounted() {
    this.updateInterval = setInterval(this.update, 5 * 60 * 1000);
    this.lastUpdatedTextInterval = setInterval(() => this.lastUpdatedString = this.timeAgo(this.lastUpdated), 50 * 1000);
  },

  methods: {
    getFormattedDate(date, prefomattedDate = false, hideYear = false) {
      const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
      }

      if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
      }

      if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
      }

      // 10. January 2017. at 10:20
      return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
    },

    timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }

      const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();


      if (seconds < 5) {
        return 'just now';
      } else if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (seconds < 90) {
        return 'about a minute ago';
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (isToday) {
        return this.getFormattedDate(date, 'Today'); // Today at 10:20
      } else if (isYesterday) {
        return this.getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
      } else if (isThisYear) {
        return this.getFormattedDate(date, false, true); // 10. January at 10:20
      }

      return this.getFormattedDate(date); // 10. January 2017. at 10:20
    },

    filterStreamers() {
      this.offline = [];
      this.online = [];

      this.streamer_data.forEach(x =>
          (x.live ? this.online : this.offline).push(x)
      );

      this.featuredStreamer = this.online.filter(x => !!x.featuredRank)
          .sort((l, r) => l.featuredRank - r.featuredRank)[0];
      this.online.sort((l, r) => r.viewers - l.viewers);
    },

    async update() {
      try {
        this.streamer_data = await this.$axios.$get('https://api.jdanks.army/streams');
        this.filterStreamers();

        this.lastUpdated = new Date();
        this.lastUpdatedString = this.timeAgo( this.lastUpdated );

      } catch (e) {
        console.error(e);
      }
    }
  },

  async fetch() {
    await this.update();
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
