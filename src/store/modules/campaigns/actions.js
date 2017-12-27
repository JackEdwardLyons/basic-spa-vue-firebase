 export const actions = {
   updateCampaignCategory ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_CATEGORY', text)
   },
   updateCampaignContent ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_CONTENT', text)
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
   updateCampaignTerm ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_TERM', text)
   },
   updateCampaignUrl ({ commit }, text) {
     commit('UPDATE_CAMPAIGN_URL', text)
   },
   updateGeneratedCampaignUrl ({ commit }) {
     commit('UPDATE_GENERATED_CAMPAIGN_URL')
   }
 }
