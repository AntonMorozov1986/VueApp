import firebase from "firebase";

class Order {
  constructor ({name, phone, adId, isDone = false, id = null}) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.isDone = isDone;
    this.id = id;
    console.log(this);
  }
}

export default {
  state: {
    orders: []
  },

  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },

  actions: {
    async createOrder ({commit}, payload) {
      const {authorId} = payload
      const order = new Order(payload);
      commit('clearError')

      try {
        await firebase.database().ref(`/users/${authorId}/orders`).push(order)
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async fetchOrders ({commit, getters}) {
      commit('setLoading', true);
      commit('clearError');

      const resultOrders = [];

      try {
        const firebaseVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value');
        const orders = firebaseVal.val();

        Object.keys(orders).forEach(key => {
          resultOrders.push({...new Order(orders[key]), id: key});
          console.log(resultOrders);
        })

        commit('loadOrders', resultOrders);

        commit('setLoading', false);
      } catch (err) {
        commit('setError', err.message);
        commit('setLoading', false);
        throw err;
      }
    },

    async markOrderDone ({commit, getters}, id) {
      commit('clearError');

      try {
        await firebase.database()
          .ref(`/users/${getters.user.id}/orders`)
          .child(id)
          .update({isDone: true});
      } catch (err) {
        commit('setError', err.message);
        throw err;
      }
    }
  },

  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.isDone === true);
    },
    undoneOrders (state) {
      return state.orders.filter(order => order.isDone === false);
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders);
    }
  }
}
