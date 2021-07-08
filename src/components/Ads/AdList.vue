<template>
  <v-container v-if="!loading && myAds.length !== 0">
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

  <v-container v-else-if="!loading && myAds.length === 0">
    <v-row>
      <v-flex xs10 sm6 class="mx-auto">
        <h1 class="text--secondary mb-3">You have no ads</h1>
      </v-flex>
    </v-row>
  </v-container>

  <v-container v-else>
    <v-layout row>
      <v-flex xs12 class="text-center pt-16">
        <v-progress-circular
            indeterminate
            color="primary"
            size="130"
            width="5"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AdList",
  computed: {
    myAds () {
      return this.$store.getters.myAds;
    },

    loading () {
      return this.$store.getters.loading;
    }
  }
}
</script>

<style scoped>

</style>