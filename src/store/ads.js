import firebase from "firebase";

class Ad {
  constructor({title, description, authorId, imageSrc = '', promo = false, id = null}) {
    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.imageSrc = imageSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: []
  },

  mutations: {
    createAd (state, payload) {
      debugger;
      state.ads.push(payload);
    },

    loadAds (state, payload) {
      state.ads = payload;
    },

    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(element => element.id === id);
      ad.title = title;
      ad.description = description;
    }
  },

  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError');
      commit('setLoading', true);

      const image = payload.image;

      try {
        debugger;
        const newAd = new Ad ({...payload, authorId: getters.user.id})
        const ad = await firebase.database().ref('ads').push(newAd);
        const imageExt = image.name.slice(image.name.lastIndexOf('.'));

        const imageStorageRef = await firebase.storage().ref(`ads/${ad.key + imageExt}`);
        await imageStorageRef.put(image);
        const imageSrc = await imageStorageRef.getDownloadURL();
        await firebase.database().ref('ads').child(ad.key).update({imageSrc});

        commit('setLoading', false);
        commit('createAd', {...newAd, id: ad.key, imageSrc});

      } catch (err) {
        commit('setError', err.message);
        commit('setLoading', false);
        throw err
      }
    },

    async fetchAds ({commit}) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const firebaseValue = await firebase.database().ref('ads').once('value');
        const ads = firebaseValue.val();
        const adsArray = [];
        Object.keys(ads).forEach(key => {
          const ad = ads[key];
          adsArray.push(
            new Ad({...ad, id: key})
          )
        })
        commit('loadAds', adsArray);

        commit('setLoading', false);
      } catch (err) {
        commit('setError', err.message);
        commit('setLoading', false);

        throw err;
      }
    },

    async updateAd ({commit}, {title, description, id}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        await firebase.database().ref('ads').child(id).update({title, description});
        commit('updateAd', {title, description, id})
        commit('setLoading', false);
      } catch (err) {
        commit('setError', err.message);
        commit('setLoading', false);
        throw err;
      }
    }
  },

  getters: {
    ads (state) {
      return state.ads;
    },

    promoAds (state) {
      return state.ads.filter(ad => ad.promo);
    },

    myAds (state, getters) {
      return state.ads.filter(ad => ad.authorId === getters.user.id);
    },

    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId);
      }
    }
  }
}