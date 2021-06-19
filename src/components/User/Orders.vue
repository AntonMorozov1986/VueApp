<template>
  <v-container>
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
</template>

<script>
export default {
  name: "Orders",
  data () {
    return {
      orders: [
        {
          id: 'o123',
          name: 'John',
          phone: '8-921-125-25-55',
          adId: '102',
          isDone: false
        }
      ]
    }
  },

  methods: {
    markDone (order) {
      alert('done');
      order.isDone = true;
    }
  }
}
</script>

<style scoped>

</style>