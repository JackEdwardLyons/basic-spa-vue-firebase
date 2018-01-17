<template>
  <!-- v-app :: Required by Vuetify -->
  <v-app>
    <!-- v-navigation-drawer :: only appears on <= 576px -->
    <v-navigation-drawer absolute temporary v-model="sidebar">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="userSignOut" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="grey darken-4 grey white--text" fixed><!-- v-toolbar :: for top navbar -->
      <span class="hidden-sm-and-up"><!-- show at >= 576px -->
        <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          class="white--text"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn class="white--text" flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- <main> tag no longer needed. -->
    <!-- router-view :: This tag will tell Vue-router to render your routes inside it. -->
    <router-view></router-view>
    <!-- </main> -->

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: false
      }
    },
    computed: {
      appTitle () {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters['auth/getUser'] !== null && this.$store.getters['auth/getUser'] !== undefined
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
            { title: 'admin', path: '/admin', icon: 'home' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('auth/userSignOut')
        this.$store.dispatch('auth/setUserId', '')
      }
    },
    created () {
      if (this.isAuthenticated) {
        this.$store.dispatch('camp/getDataTable')  // get data from db once
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .toolbar__side-icon.btn {
    color: #fff;
  }
</style>