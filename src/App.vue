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
        <v-list-item
          @click="makeLogout"
          v-if="isUserLogin"
        >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card
        color="grey lighten-4"
        flat
        tile
        class="mb-5"
    >
      <v-app-bar
          dense
          dark
          color="primary"
      >

        <router-link to="/" tag="span" class="pointer">Vue Ads Application</router-link>

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
          <v-btn
              class="btn"
              plain
              @click="makeLogout"
              v-if="isUserLogin"
          >
            <v-icon left>mdi-exit-to-app</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon
            class="hidden-md-and-up"
            @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-app-bar>
    </v-card>

    <v-main>
        <router-view></router-view>
    </v-main>

    <template
        v-if="error"
    >
      <v-snackbar
          :multi-line="true"
          :timeout="5000"
          color="error"
          @input="closeError"
          value="true"
      >
        {{ error }}

        <v-btn
            color="black"
            text
            @click="closeError"
        >
          Close
        </v-btn>

      </v-snackbar>
    </template>


  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false
    }
  },

  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLogin () {
      return this.$store.getters.isUserLogin
    },
    links () {
      if (this.isUserLogin) {
        return [
          {title: 'Home', icon: 'mdi-home', url: '/'},
          {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
          {title: 'New ad', icon: 'mdi-file-plus', url: '/new'},
          {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list'}
        ]
      }

      return [
        {title: 'Home', icon: 'mdi-home', url: '/'},
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration'}
      ]
    }
  },

  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },

    makeLogout () {
      this.$store.dispatch('logoutUser');
      if (this.$route.fullPath !== '/') {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
.btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.pointer {
  cursor: pointer;
  font-weight: bold;
}
</style>

