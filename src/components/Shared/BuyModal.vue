<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" plain v-on="on">Buy</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h3 class="text--primary">Do you want to buy it?</h3>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  name="name"
                  label="Your name"
                  type="text"
                  v-model="name"
              ></v-text-field>
              <v-text-field
                  name="phone"
                  label="Your phone"
                  v-model="phone"
                  no-resize
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  class="warning"
                  plain
                  @click="onCancel"
                  :disabled="localLoading"
              >Close</v-btn>
              <v-btn
                  class="success"
                  @click="onSave"
                  :disabled="localLoading"
                  :loading="localLoading"
              >Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },

  methods: {
    onCancel () {
      this.name = '';
      this.phone = '';
      this.modal = false;
    },

    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true;
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          authorId: this.ad.authorId
        })
          .finally(() => {
            this.name = '';
            this.phone = '';
            this.localLoading = false;
            this.modal = false;
          })


      }

      // alert('Title and Description must not empty')
    }
  }
}
</script>

<style scoped>

</style>