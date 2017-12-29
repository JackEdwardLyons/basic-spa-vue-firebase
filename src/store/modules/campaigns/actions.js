 export const actions = {
   updateLoadingState ({ commit }, state) {
     commit('UPDATE_LOADING_STATE', state)
   },
   updateCampaignName ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_NAME', text)
   },
   updateCampaignMedium ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_MEDIUM', text)
   },
   updateCampaignSource ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_SOURCE', text)
   },
   updateCampaignUrl ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_URL', text)
   },
   updateSubmittedDataState ({ commit }, payload) {
     commit('UPDATE_SUBMITTED_DATA', payload)
   },
   updateGeneratedCampaignUrl ({ commit }, text) {
     commit('UPDATE_GENERATED_CAMPAIGN_URL')
   }
 }
