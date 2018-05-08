export const mutations = {
  UPDATE_LOADING_STATE (state, payload) {
    state.campaign.loading = payload
  },
  SET_DATA_TABLE (state, payload) {
    state.campaign.tableData.push(payload)
  },
  UPDATE_DATA_TABLE (state, payload) {
    const campaign = state.campaign.tableData.filter(c => c.key === payload.key)[0]
    campaign.campaign_link = payload.campaign_link
    campaign.campaign_name = payload.campaign_name
  }
}
