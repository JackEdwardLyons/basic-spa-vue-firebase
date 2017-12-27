 export const getters = {
   getCampaignCategory (state) {
     return state.campaign.category
   },
   getCampaignContent (state) {
     return state.campaign.content
   },
   getCampaignName (state) {
     return state.campaign.name
   },
   getCampaignMedium (state) {
     return state.campaign.medium
   },
   getCampaignSource (state) {
     return state.campaign.source
   },
   getCampaignTerm (state) {
     return state.campaign.term
   },
   getCampaignUrl (state) {
     return state.campaign.url
   },
   getGeneratedCampaignUrl (state) {
     return state.campaign.generatedUrl
   }
 }
