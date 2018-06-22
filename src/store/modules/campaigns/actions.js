import { db } from '../../../main'

let isCampaingBound = false // to track whether the child_added event is hooked or not
export const actions = {
  updateLoadingState ({ commit }, state) {
    commit('UPDATE_LOADING_STATE', state)
  },
  getDataTable ({ commit }) {
    if (isCampaingBound) {
      return 0 // do nothing as campaing is already bound
    }
    isCampaingBound = true

    // event for campaings features must be bound only once for the whole app
    const ref = db.ref('/campaigns')
    ref.on('child_added', (snapshot, prevChildKey) => {
      commit('SET_DATA_TABLE', {
        key: snapshot.key,
        ...snapshot.val()
      })
    }, error => {
      console.log(error)
    })
  },
  updateDataTable ({ commit }, record) {
    db.ref().child(`campaigns/${record.key}`)
    .update({
      campaign_name: record.campaign_name,
      campaign_link: record.campaign_link
    }, (error) => {
      if (!error) {
        commit('UPDATE_DATA_TABLE', record)
      }
    })
  },
  deleteDataTable ({ commit }, record) {
    db.ref().child(`campaigns/${record.key}`)
      .remove(error => {
        if (!error) {
          commit('DELETE_DATA_TABLE', record)
        }
      })
  }
}
