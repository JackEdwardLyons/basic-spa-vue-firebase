import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

// export the entire module so it can be imported into my global store.
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
