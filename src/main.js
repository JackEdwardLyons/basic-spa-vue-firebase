import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import firebase from 'firebase'
import { firebaseConfig } from './config'

Vue.use(Vuetify)

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

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
      // Firebase has an observer called onAuthStateChanged which will help your
      // app to figure out whether your user is currently signed in or not.
      store.dispatch('autoSignIn', firebaseUser)
    }
  })
  unsubscribe()
})
