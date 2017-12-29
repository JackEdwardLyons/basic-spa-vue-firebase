 export const getters = {
   getCampaignName (state) {
     return state.campaign.name
   },
   getCampaignMedium (state) {
     return state.campaign.medium
   },
   getCampaignSource (state) {
     return state.campaign.source
   },
   getCampaignUrl (state) {
     return state.campaign.url
   },
   getGeneratedCampaignUrl (state) {
     return state.campaign.generatedUrl
   },
   getTableData (state) {
     return state.campaign.tableData
   },
   getTableHeaders (state) {
     return state.campaign.tableHeaders
   }
 }
