 export const actions = {
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
   updateGeneratedCampaignUrl ({ commit }, text) {
     commit('UPDATE_GENERATED_CAMPAIGN_URL')
   }
 }
