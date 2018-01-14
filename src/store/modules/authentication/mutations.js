export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setUserId (state, payload) {
    state.userId = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}
