import { db } from '../../../main'

export const actions = {
  updateLoadingState ({ commit }, state) {
    commit('UPDATE_LOADING_STATE', state)
  },
  getDataTable ({ commit }) {
    const ref = db.ref('/campaigns')
    ref.on('child_added', (snapshot, prevChildKey) => {
      commit('SET_DATA_TABLE', snapshot.val())
    }, error => {
      console.log(error)
    })
  },
  updateDataTable ({ commit }) {
    const ref = db.ref('/campaigns')
    ref.on('child_changed', (snapshot, prevChildKey) => {
      commit('UPDATE_DATA_TABLE', snapshot.val())
    }, error => {
      console.log(error)
    })
  }
}
