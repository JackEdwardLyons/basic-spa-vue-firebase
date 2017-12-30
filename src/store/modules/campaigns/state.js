export const state = {
  campaign: {
    dataSubmitted: false,
    generatedUrl: '',
    loading: false,
    medium: '',
    name: '',
    source: '',
    url: '',
    // TODO:
    // 1. Potentially get rid of the form data fields as they use v-model
    // 2. Only really need the submitted data object once pushed to db
    // 3. Remove mock data and use proper data
    tableHeaders: [
      { text: 'Link Name', align: 'left', value: 'campaign_name' },
      { text: 'Date Created', value: 'campaign_created' },
      { text: 'Generated UTM Link', value: 'campaign_link', sortable: false },
      { text: 'Copy to clipboard', value: 'copy', sortable: false }
    ],
    tableData: []
  }
}
