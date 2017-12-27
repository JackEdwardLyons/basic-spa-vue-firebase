 export const actions = {
   updateCampaign ({ commit }, text) {
     commit('UPDATE_CAMPAIGN', text)
   },
   updateCampaignCategory ({ commit }, e) {
     commit('camp/UPDATE_CAMPAIGN_CATEGORY', e.target.value)
   },
   updateCampaignMedum ({ commit }, e) {
     commit('camp/UPDATE_CAMPAIGN_MEDIUM', e.target.value)
   },
   updateCampaignSource ({ commit }, e) {
     commit('camp/UPDATE_CAMPAIGN_SOURCE', e.target.value)
   },
   updateCampaignTerm ({ commit }, e) {
     commit('camp/UPDATE_CAMPAIGN_TERM', e.target.value)
   },
   updateCampaignUrl ({ commit }, e) {
     commit('camp/UPDATE_CAMPAIGN_URL', e.target.value)
   },
   updateGeneratedCampaignUrl ({ commit }) {
     commit('camp/UPDATE_GENERATED_CAMPAIGN_URL')
   }
 }
