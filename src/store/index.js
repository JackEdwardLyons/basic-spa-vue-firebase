/* Vuex Store ::
 * Serves as a centralized store for all the components in the application,
 * with rules ensuring that the state can only be mutated in a predictable fashion.
 *
 * State is an object with application data.
 * Mutations are needed to change that state.
 * Actions are needed to dispatch mutations.
 * Getters are needed to get the store.
 */

 import Vue from 'vue'
 import Vuex from 'vuex'
 import authentication from './modules/authentication/authentication'
 import campaigns from './modules/campaigns/campaigns'

 Vue.use(Vuex)

/* Vuex Modules ::
 * Modules are super important to use once your application starts growing. Because Vuex
 * is a single state tree, the entire state of your application is contained inside one big
 * object. However, this can get really bloated as you add new features and their corresponding states.
 * We get around this state bloat by using Modules to separate out the various pieces of state.
 */

 export const store = new Vuex.Store({
   state: {
     appTitle: 'UTM Campaign Manager'
   },
   modules: {
     auth: authentication,
     camp: campaigns
   }
 })
