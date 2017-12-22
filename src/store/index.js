/* Vuex ::
 * Serves as a centralized store for all the components in an application,
 * with rules ensuring that the state can only be mutated in a predictable fashion.
 *
 * State is an object with application data.
 * Mutations are needed to change that state.
 * Actions are needed to dispatch mutations.
 * Getters are needed to get the store.
 */

 import Vue from 'vue'
 import Vuex from 'vuex'

 import { state } from './state'
 import { mutations } from './mutations'
 import { actions } from './actions'
 import { getters } from './getters'

 Vue.use(Vuex)

 export const store = new Vuex.Store({
   state,
   mutations,
   actions,
   getters
 })
