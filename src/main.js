import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase/app";
import '@babel/polyfill'
// import user from "@/store/user";

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),

  router,
  store,
  vuetify,
  created() {
    let firebaseConfig = {
      "apiKey": "AIzaSyAK8YbQ14i_A-43ZO9qL4fGkyunBAdH7Ew",
      "authDomain": "itc-ads-3f496.firebaseapp.com",
      "projectId": "itc-ads-3f496",
      "storageBucket": "itc-ads-3f496.appspot.com",
      "messagingSenderId": "994254366478",
      "appId": "1:994254366478:web:4babe4f4a5e3862176195f",
      "measurementId": "G-V1VGNEY6BY",
      "databaseURL": "https://itc-ads-3f496-default-rtdb.europe-west1.firebasedatabase.app/"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.$store.dispatch('autoLoginUser', user);
      }
      if (this.$route.fullPath !== '/') {
        this.$router.push('/');
      }
    });

    this.$store.dispatch('fetchAds')
  }
})
