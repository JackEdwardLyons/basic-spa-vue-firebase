export const state = {
  campaign: {
    loading: false,
    tableData: [
      // data from firebase db goes here
    ],
    tableHeaders: [
      { text: 'Link Name', align: 'left', value: 'campaign_name' },
      { text: 'Date Created', value: 'campaign_created' },
      { text: 'Generated UTM Link', value: 'campaign_link', sortable: false },
      { text: 'Settings', value: 'copy', sortable: false }
    ]
  }
}
