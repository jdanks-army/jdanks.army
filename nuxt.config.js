import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Multi-Platform Streamer List - [JDANKS army]',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Keep up to date with your favorite streamers. A list of streams across many platforms, with live status, stream title, viewer count, and more!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  router: {
    middleware: ['discordRedirects'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      name: '[JDANKS army]',
      author: 'dvdrw, et al',
      description: 'Keep up to date with your favorite streamers. A list of streams across many platforms, with live status, stream title, viewer count, and more!',
      ogHost: 'jdanks.army',
      ogImage: true
    },
    manifest: {
      name: '[JDANKS army]',
      short_name: '[JDANKS army]',
      description: 'Keep up to date with your favorite streamers. A list of streams across many platforms, with live status, stream title, viewer count, and more!',
      orientation: 'portrait',
      categories: [ 'entertainment', 'social' ],
      display: 'standalone',
      theme_color: '#1e1e1e',
      background_color: '#1e1e1e',
    },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },
        {
          urlPattern: 'https://fonts.gstatic.com',
          handler: 'StaleWhileRevalidate',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },
      ],
      offlineAssets: [
          '/defaultAvatar.webp',
          '/platforms/bitwave.svg',
          '/platforms/dlive.png',
          '/platforms/robotstreamer.png',
          '/platforms/trovo.png',
          '/platforms/twitch.png',
          '/platforms/youtube.png',
      ]
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ["nuxt-rfg-icon", { masterPicture: "static/icon.png" }],
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.teal.darken2,
          accent: colors.grey.darken1,
          cardback: colors.grey.darken4,
          'image-back': '#151515',
          'grey-darken2': colors.grey.darken2,
          secondary: colors.red.darken3,
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.teal.lighten2,
          accent: colors.grey.base,
          cardback: colors.grey.lighten5,
          'image-back': '#151515',
          'grey-darken2': colors.grey.darken2,
          secondary: colors.red.darken3,
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
