<template>
  <v-container v-if="loading">
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
  <v-container v-else-if="!loading && orders.length !== 0">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 class="mt-5">
        <v-list
            subheader
            two-line
            flat
        >
          <h1 class="text--secondary mb-3">Orders</h1>

            <v-list-item
              v-for="order of orders"
              :key="order.id"
            >

              <v-checkbox
                v-model="order.isDone"
                :disabled="order.isDone"
                @change="markDone(order)"
              ></v-checkbox>


              <v-list-item-content>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  class="primary"
                  :to="'/ad/' + order.adId"
                >Open</v-btn>
              </v-list-item-action>
            </v-list-item>

        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else>
    <v-layout row>
      <v-flex xs12 class="text-center pt-16">
        <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Orders",


  computed: {
    loading () {
      return this.$store.getters.loading;
    },

    orders () {
      return this.$store.getters.orders;
    }
  },

  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => order.isDone = true)
        .catch((err) => console.log(err));
    }
  },

  created () {
    this.$store.dispatch('fetchOrders');
  }
}
</script>

<style scoped>

</style>