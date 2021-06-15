<template>
  <v-app>
    <v-navigation-drawer
        app
        right
        temporary
        v-model="drawer"
    >
      <v-list>
        <v-list-item
            v-for="link of links"
            :key="link.title"
            :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar dense dark color="primary">

        <v-toolbar-title>Vue Ads Application</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
              class="btn"
              v-for="link of links"
              :key="link.title"
              :to="link.url"
              plain
          >
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon
            class="hidden-md-and-up"
            @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-toolbar>
    </v-card>

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      links: [
        {title: 'Home', icon: 'mdi-home', url: '/'},
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration'},
        {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
        {title: 'New ad', icon: 'mdi-file-plus', url: '/new'},
        {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list'}
      ]
    }
  }
};
</script>

<style>
.btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

