<template>

<v-card width="100%" height="60" elevation="6" color="grey darken-4" :href="link">
  <v-img :lazy-src="lazyThumbnail" :src="data.avatar" width="60" height="60" class="align-end float-left" :class="{monochrome: !live}" contain />
  <div class="">
    <v-card-title class="user-info" :class="{'grey--text': !live, 'offline-title': !live, title: live}">
      <span class="user-info-item">{{data.name}}</span>

      <v-chip tag="span" v-if="live" class="ml-2 user-info-item" pill color="red" x-small> LIVE </v-chip>
      <v-chip tag="span" v-else class="ml-2 user-info-item" pill color="grey" outlined x-small> OFFLINE </v-chip>

      <v-img max-width="18px" contain :src="platformImage" class="ml-2 user-info-item" :class="{monochrome: !live}" />
    </v-card-title>
    <v-card-subtitle class="subtitle text-truncate" v-if="live">{{data.title}}</v-card-subtitle>
  </div>
  <div v-if="live" class="float-right viewers">
    <v-icon color="red">mdi-account</v-icon>{{data.viewers}}
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
  },
  data() {
    return {
      lazyThumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAp0lEQVRoge3RsQnCUABF0d+LlSAIbuAGFtaxskrnBOkdRFBTBgt3ENI5RMAB3CNDCOYhp77NhVM29alfdcvdY1udX+vn8TB8rs29nc9u78t+0XT/1svUA7/uZeoBwoQJEyZMmHDuIGHChAkTTh4kTJgwYcLJg4QJEyZMOHmQMGHChAknDxImTJgw4eRBwoQJEyacPEiYMGHChJMHCRMmTJhw8iDhL/sISEfh9/wviAUAAAAASUVORK5CYII="
    }
  },
  computed: {
    platformImage() {
      const map = new Map([
          ['twitch', '/twitch.png'],
          ['dlive', '/dlive.png'],
          ['youtube', '/youtube.png'],
          ['bitwave', '/bitwave.svg'],
      ])
      return map.get(this.data.platform);
    },
    link() {
      const map = new Map([
        ['twitch', 'twitch.tv/'],
        ['dlive', 'dlive.tv/'],
        ['youtube', 'youtube.com/channel/'],
        ['bitwave', 'bitwave.tv/'],
      ]);
      return 'https://' + map.get(this.data.platform) + this.data.id;
    }
  }
}
</script>

<style scoped lang="scss">
  $max-lines: 4;
  $line-height: 2rem;

  .multiline-truncate {
    position: relative;
    max-height: $line-height * $max-lines;
    overflow: hidden;

    &:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: $line-height;
      background: linear-gradient(to right, #22222200, #222222FF 50%);
    }
  }

  .title {
    padding: 0 !important;
    margin: 0 !important;

    padding-left: 10px !important;
    padding-top: 4px !important;
  }

  .offline-title {
    padding: 0 !important;
    margin: 0 !important;

    padding-left: 10px !important;
    padding-top: 14px !important;
  }

  .monochrome {
    filter: grayscale(100%);
    transition: all .15s ease-in-out;

    &:hover {
      filter: grayscale(66%);
    }
  }

  .subtitle {
    padding: 0 !important;
    margin: 0 !important;

    margin-left: 70px !important;
    margin-top: -6px !important;

    max-width: 75%;
  }

  @media (max-width: 560px) {
    .subtitle {
      max-width: 55%;
    }
  }

  .viewers {
    padding: 0 !important;
    margin: 0 !important;

    padding-right: 10px !important;
    margin-top: -35px !important;
  }
</style>
