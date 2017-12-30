// import axios from 'axios'
import { db } from '../../../main'

export const actions = {
  updateLoadingState ({ commit }, state) {
    commit('UPDATE_LOADING_STATE', state)
  },
  updateDataTable ({ commit }) {
    const ref = db.ref('/campaigns')
    // child_added is triggered once for each existing child and
    // then again every time a new child is added to the specified path
    ref.on('child_added', (snapshot, prevChildKey) => {
      var newCampaign = snapshot.val()
      console.log(newCampaign)
      commit('UPDATE_DATA_TABLE', newCampaign)
    }, error => {
      console.log(error)
    })
  }
  // updateCampaignName ({ commit }, text) {
  //   commit('UPDATE_CAMPAIGN_NAME', text)
  // },
  // updateCampaignMedium ({ commit }, text) {
  //   commit('UPDATE_CAMPAIGN_MEDIUM', text)
  // },
  // updateCampaignSource ({ commit }, text) {
  //   commit('UPDATE_CAMPAIGN_SOURCE', text)
  // },
  // updateCampaignUrl ({ commit }, text) {
  //   commit('UPDATE_CAMPAIGN_URL', text)
  // },
  // updateSubmittedDataState ({ commit }, payload) {
  //   commit('UPDATE_SUBMITTED_DATA', payload)
  // },
  // updateGeneratedCampaignUrl ({ commit }, text) {
  //   commit('UPDATE_GENERATED_CAMPAIGN_URL')
  // }
}
