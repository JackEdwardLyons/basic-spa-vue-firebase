import { db } from '../../../main'

export const actions = {
  updateLoadingState ({ commit }, state) {
    commit('UPDATE_LOADING_STATE', state)
  },
  updateDataTable ({ commit }) {
    const ref = db.ref('/campaigns')
    ref.once('child_added', (snapshot, prevChildKey) => {
      // child_added is triggered once for each existing child and
      // then again every time a new child is added to the specified path
      let newCampaign = snapshot.val()
      commit('UPDATE_DATA_TABLE', newCampaign)
    }, error => {
      console.log(error)
    })
  }
}
