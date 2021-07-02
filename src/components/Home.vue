<template>

  <div v-if="!loading">
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-carousel
              cycle
              show-arrows-on-hover
          >
            <v-carousel-item
                v-for="(ad) of promoAds"
                :key="ad.id"
                :src="ad.imageSrc"
                reverse-transition="fade-transition"
                transition="fade-transition"
            >
              <div class="carousel-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-layout wrap>
        <v-flex
            xs12
            sm6
            lg4
            v-for="ad of ads"
            :key="ad.id"
        >
          <v-card
              class="mx-auto mb-4"
              max-width="344"
              mb-4
          >
            <v-img
                :src="ad.imageSrc"
                height="200px"
            ></v-img>

            <v-card-title>
              {{ ad.title }}
            </v-card-title>

            <v-card-subtitle>{{ ad.description }}</v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  text
                  :to="'/ad/' + ad.id"
              >
                Open
              </v-btn>

              <v-btn
                  text
                  class="primary"
              >
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

  <div v-else>
    <v-container>
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
  </div>

</template>

<script>
export default {
  name: "Home",

  computed: {
    promoAds () {
      return this.$store.getters.promoAds;
    },
    ads () {
      return this.$store.getters.ads;
    },
    loading () {
      return this.$store.getters.loading;
    }
  }
}
</script>

<style scoped>
  .carousel-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
</style>