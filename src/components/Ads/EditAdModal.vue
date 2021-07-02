<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" plain v-on="on">Edit</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h3 class="text--primary">Edit Ad</h3>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  name="title"
                  label="Title"
                  type="text"
                  v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                  name="description"
                  label="Description"
                  v-model="editedDescription"
                  no-resize
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="warning" plain @click="onCancel">Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },

  methods: {
    onCancel () {
      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;
      this.modal = false;
    },

    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {

        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        });

        this.modal = false;
      }

      // alert('Title and Description must not empty')
    }
  }
}
</script>

<style scoped>

</style>