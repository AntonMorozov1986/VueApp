<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img
            :src="ad.imageSrc"
            height="300"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
<!--            <v-btn class="warning" plain>Edit</v-btn>-->
            <app-edit-ad-modal v-if="isAuthor" :ad="ad"></app-edit-ad-modal>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from "@/components/Ads/EditAdModal";

export default {
  name: "Ad",
  props: ['id'],
  components: {
    appEditAdModal: EditAdModal
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },

    loading () {
      return this.$store.getters.loading
    },

    isAuthor () {
      return this.ad.authorId === this.$store.getters.user.id;
    }
  }
}
</script>

<style scoped>

</style>