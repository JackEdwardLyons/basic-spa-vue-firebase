 export const getters = {
  //  getCampaignName (state) {
  //    return state.campaign.name
  //  },
  //  getCampaignMedium (state) {
  //    return state.campaign.medium
  //  },
  //  getCampaignSource (state) {
  //    return state.campaign.source
  //  },
  //  getCampaignUrl (state) {
  //    return state.campaign.url
  //  },
   getLoadingState (state) {
     return state.campaign.loading
   },
  //  getGeneratedCampaignUrl (state) {
  //    return state.campaign.generatedUrl
  //  },
  //  getSubmittedDataState (state) {
  //    return state.campaign.dataSubmitted
  //  },
   getTableData (state) {
     return state.campaign.tableData
   },
   getTableHeaders (state) {
     return state.campaign.tableHeaders
   }
 }
