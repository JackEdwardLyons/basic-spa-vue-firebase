<template>
  <!-- v-app :: Required by Vuetify -->
  <v-app>
    <!-- v-navigation-drawer :: only appears on <= 576px -->
    <v-navigation-drawer temporary v-model="sidebar">
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
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed><!-- v-toolbar :: for top navbar -->
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
        <v-btn flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <!-- v-container :: a wrapper for the grid -->
      <v-container fluid>
        <!-- router-view :: This tag will tell Vue-router to render your routes inside it. -->
        <router-view></router-view>
      </v-container>
    </main>
    
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        appTitle: 'Awesome App',
        sidebar: false,
        menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
        ]
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>