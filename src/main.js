import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store/index'

import VueClipboard from 'vue-clipboard2'

import firebase from 'firebase'
import VueFire from 'vuefire'
import { firebaseConfig } from './config'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(VueClipboard)

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

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
      store.dispatch('auth/autoSignIn', firebaseUser)
    }
  })
  unsubscribe()
})
