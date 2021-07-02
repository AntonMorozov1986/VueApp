<template>
  <v-container>
    <v-row>
      <v-flex xs10 sm6 class="mx-auto">
        <h1 class="text--secondary mb-3">My ads</h1>

        <v-card class="elevation-10 mb-8"
          v-for="ad of myAds"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="ad.imageSrc"
                height="160px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="info mr-3"
                    :to="'/ad/' + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdList",
  computed: {
    myAds () {
      return this.$store.getters.myAds;
    }
  }
}
</script>

<style scoped>

</style>