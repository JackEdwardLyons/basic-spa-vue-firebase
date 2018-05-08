 export const getters = {
   getLoadingState (state) {
     return state.campaign.loading
   },
   getTableData (state) {
     return state.campaign.tableData
   },
   getTableHeaders (state) {
     return state.campaign.tableHeaders
   }
 }
