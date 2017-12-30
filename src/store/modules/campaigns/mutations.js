export const mutations = {
  // UPDATE_CAMPAIGN_NAME (state, payload) {
  //   state.campaign.name = payload
  // },
  // UPDATE_CAMPAIGN_MEDIUM (state, payload) {
  //   state.campaign.medium = payload
  // },
  // UPDATE_CAMPAIGN_SOURCE (state, payload) {
  //   state.campaign.source = payload
  // },
  // UPDATE_CAMPAIGN_URL (state, payload) {
  //   state.campaign.url = payload
  // },
  // UPDATE_GENERATED_CAMPAIGN_URL (state, payload) {
  //   state.campaign.generatedUrl = payload
  // },
  UPDATE_LOADING_STATE (state, payload) {
    state.campaign.loading = payload
  },
  UPDATE_DATA_TABLE (state, payload) {
    state.campaign.tableData.push(payload)
    // TODO: This shouldnt push but update!!!
  }
  // UPDATE_SUBMITTED_DATA (state, payload) {
  //   state.campaign.dataSubmitted = payload
  // }
}
