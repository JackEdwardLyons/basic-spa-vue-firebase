export const mutations = {
  UPDATE_LOADING_STATE (state, payload) {
    state.campaign.loading = payload
  },
  UPDATE_DATA_TABLE (state, payload) {
    state.campaign.tableData.push(payload)
  },
  SET_DATA_TABLE (state, payload) {
    state.campaign.tableData.push(payload)
  }
}
