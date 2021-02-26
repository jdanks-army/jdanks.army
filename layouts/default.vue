<template>
  <v-app>
    <v-app-bar
      fixed
      app
      hide-on-scroll
      height="50px"
      elevation="10"
    >
      <v-spacer />
      <v-toolbar-title>
        <logo />
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt @updated="u => this.lastUpdated = u" />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-chip pill outlined small color="blue" class="ml-2">
        <v-icon small left>mdi-scale-balance</v-icon> AGPLv3.0
      </v-chip>
      <v-chip pill outlined small color="green" class="ml-2" href="https://github.com/jdanks-army/jdanks.army">
        <v-icon small left>mdi-open-in-new</v-icon> source code
      </v-chip>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from "@/components/Logo";
import RandomQuote from "../components/RandomQuote";
export default {
  components: {RandomQuote, Logo},
  data () {
    return {
      fixed: false,
      lastUpdated: null,
    }
  }
}
</script>
