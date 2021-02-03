<template>

<v-card
    width="100%"
    :height="size"

    elevation="6"

    color="grey darken-4"

    :class="{monochrome: !live}"
    :href="link"
>

  <slot/>

  <div class="d-flex flex-row">

    <aside class="mr-2">
      <v-img
          :src="data.avatar || defaultAvatar"
          :width="size" :height="size"
          class="rounded-left"
      />
    </aside>

        <main
            @mouseenter="onHover(true)"
            @mouseleave="onHover(false)"
            class="flex-grow-hsafe hide-overflow"
            :class="live ? 'd-flex flex-column' : 'align-content-center-inline'"
        >
          <div class="title align-content-center-inline">
            <v-img width="18px" contain eager :src="platformImage"/>

            <span :class="!live && 'grey--text'">{{data.name}}</span>

            <v-chip v-if="live" x-small pill color="red"> LIVE </v-chip>
            <v-chip v-else      x-small pill color="grey" outlined> OFFLINE </v-chip>

            <v-icon v-if="unread" color="warning" class="ml-n1">mdi-circle-medium</v-icon>
          </div>

          <v-tooltip bottom v-model="hoveredOver" nudge-left="130" open-delay="2000">
            <template v-slot:activator="{ on, attrs }">
              <div class="subtitle text-truncate grey--text mt-n1" v-if="live">{{data.title}}</div>
            </template>
            <span>{{data.title}}</span>
          </v-tooltip>
        </main>

    <aside v-if="live" class="align-content-center-inline text-right ml-2 pr-2" id="viewers">

      <v-icon v-if="data.viewers" color="red">mdi-account</v-icon>
      <v-icon v-else color="grey">mdi-access-point-off</v-icon>

      {{data.viewers || ''}}
    </aside>

  </div>
</v-card>

</template>

<script>
export default {
  name: "StreamerEntry",
  props: {
    data: {
      type: Object,
      required: true,
    },
    live: {
      type: Boolean,
      required: false,
    },
    unread: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number,
      required: false,
      default: 60,
    }
  },
  data() {
    return {
      defaultAvatar: "/defaultAvatar.webp",
      hoveredOver: false,
      hoverDelayId: null,
    }
  },
  computed: {
    platformImage() {
      const map = new Map([
          ['twitch', '/twitch.png'],
          ['dlive', '/dlive.png'],
          ['youtube', '/youtube.png'],
          ['bitwave', '/bitwave.svg'],
          ['robotstreamer', '/robotstreamer.png'],
          ['trovo', '/trovo.png'],
      ])
      return map.get(this.data.platform);
    },
    link() {
      const map = new Map([
        ['twitch', 'twitch.tv/'],
        ['dlive', 'dlive.tv/'],
        ['youtube', 'youtube.com/channel/'],
        ['bitwave', 'bitwave.tv/'],
        ['robotstreamer', 'robotstreamer.com/robot/'],
        ['trovo', 'trovo.live/'],
      ]);
      return 'https://' + map.get(this.data.platform) + this.data.userId;
    }
  },
  methods: {
    onHover(direction) {
      if(this.hoverDelayId) {
        clearTimeout(this.hoverDelayId);
        this.hoverDelayId = null;
      }

      if(!direction) {
        this.hoveredOver = false;
        return;
      }

      this.hoverDelayId = setTimeout(() => {
        this.hoveredOver = direction;
        this.hoverDelayId = null;
      }, 500);
    }
  }
}
</script>

<style scoped lang="scss">

  // Fix left and right pockets at 60px
  aside {
    flex: 0 0 60px;
  }

  #viewers {
    flex: 0 1 auto;
  }

  .subtitle {
    max-width: 85%;
  }

  /* Utilities */

  // Prevents line wraps and hides overflow
  .hide-overflow {
    overflow: hidden;
    white-space: nowrap;
  }

  $roundedness: 4px;
  .rounded-left {
    border-top-left-radius: $roundedness;
    border-bottom-left-radius: $roundedness;
  }

  // Gray out children, lower grayscale amount on hover
  .monochrome {
    & > * {
      transition: all .15s ease-in-out;
      filter: grayscale(100%);
    }

    &:hover > * {
      filter: grayscale(66%);
    }
  }

  // Vertically align all in line
  .vertical-align-children > * { vertical-align: middle; }

  // Vertically aligns by inserting an empty pseudo class with 100% height,
  // so that the entire height becomes line height
  .align-content-center-inline {
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }

    & > * {
      display: inline-block;
      vertical-align: middle;
    }
  }

  // Start at 0 width, and grow from there.
  // This avoids overflow in the case that starting width is greater than container width.
  .initial-width-0 {
    min-width: 0;
  }
  .flex-grow-hsafe {
    @extend .initial-width-0;
    flex: 1 0 0;
  }
</style>
