export const mutations = {
  UPDATE_CAMPAIGN (state, payload) {
    state.campaign.text = payload
  },
  UPDATE_CAMPAIGN_CATEGORY (state, payload) {
    state.campaign.category = payload
  },
  UPDATE_CAMPAIGN_MEDIUM (state, payload) {
    state.campaign.medium = payload
  },
  UPDATE_CAMPAIGN_SOURCE (state, payload) {
    state.campaign.source = payload
  },
  UPDATE_CAMPAIGN_TERM (state, payload) {
    state.campaign.term = payload
  },
  UPDATE_CAMPAIGN_URL (state, payload) {
    state.campaign.url = payload
  },
  UPDATE_GENERATED_CAMPAIGN_URL (state, payload) {
    state.campaign.generatedUrl = payload
  }
}
