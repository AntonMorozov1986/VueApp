<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create New Ad</h1>
        <v-form
            ref="form"
            v-model="valid"
            validation
        >

          <v-text-field
              class="mb-3"
              name="title"
              label="Ad title"
              type="text"
              v-model="title"
              :rules="[v => !!v || 'The Title is required']"
          ></v-text-field>

          <v-textarea
              class="mb-3"
              name="description"
              label="Ad description"
              no-resize
              rows="8"
              v-model="description"
              :rules="[v => !!v || 'The Description is required']"
          ></v-textarea>
        </v-form>

        <v-layout>
          <v-flex>
            <v-btn
                block
                color="primary"
                class="mb-3 white--text"
            >
              Upload image
              <v-icon
                  right
                  dark
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>

            <img class="new-ad-image" src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" alt="">

            <v-switch
                class="mt-0 mb-3 pt-0"
                v-model="promo"
                label="Add to promo?"
            ></v-switch>

            <v-btn
              :disabled="!valid"
              class="primary"
              @click="createAd"
            >Create Ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NewAd",
  data () {
    return {
      valid: false,
      title: '',
      description: '',
      promo: false,

    }
  },

  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        //some logic

        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo
        }

        console.log(ad);
      }
    }
  }

}
</script>

<style scoped>
.new-ad-image {
  display: block;
  margin: 0 auto 12px auto;
  width: 100%;
}
</style>