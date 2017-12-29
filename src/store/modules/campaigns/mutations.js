export const mutations = {
  UPDATE_CAMPAIGN_NAME (state, payload) {
    state.campaign.name = payload
  },
  UPDATE_CAMPAIGN_MEDIUM (state, payload) {
    state.campaign.medium = payload
  },
  UPDATE_CAMPAIGN_SOURCE (state, payload) {
    state.campaign.source = payload
  },
  UPDATE_CAMPAIGN_URL (state, payload) {
    state.campaign.url = payload
  },
  UPDATE_GENERATED_CAMPAIGN_URL (state, payload) {
    state.campaign.generatedUrl = payload
  }
}
