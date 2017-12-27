import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store/index'
import firebase from 'firebase'
import { firebaseConfig } from './config'

Vue.use(Vuetify)

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)
// let db = firebase.database()

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
// wait until Firebase has finished loading the initial
// user info before you start the app
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      // testing db
      // db.ref().child('campaigns').push().set({
      //   campaign_category: 'test',
      //   campaign_created: new Date().getTime(),
      //   campaign_medium: 'google',
      //   campaign_name: 'Google paleo',
      //   campaign_source: 'paleohacks',
      //   campaign_term: 'paleo',
      //   campaign_url: 'https://www.google.com',
      //   campaign_generated_link: 'https://www.google.com/paleohacks'
      // })

      // Firebase has an observer called onAuthStateChanged which will help your
      // app to figure out whether your user is currently signed in or not.
      store.dispatch('auth/autoSignIn', firebaseUser)
    }
  })
  unsubscribe()
})
