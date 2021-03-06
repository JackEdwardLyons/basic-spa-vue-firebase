<template>
  <v-content class="gradient-background">
    <v-container fluid style="position:relative;top:100px;">

      <v-layout column>
        <v-card class="mt-7">
          <v-card-title>
            <strong class="headline text--underline">UTM Campaigns</strong>
            <v-btn
              @click.native.stop="showAddDialog()"
              class="text-center"
              color="pink lighten-1"
              dark
              fab
              small
              title="Add new UTM campaign"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <!-- start modal -->
            <v-dialog v-model="dialog" persistent max-width="700px">
              <v-form @submit.prevent="handleSave()" ref="campaignForm">
                <v-card>
                  <v-card-title>
                    <span class="headline">Create UTM campaign</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <small>*indicates required field</small>
                      <v-layout wrap class="pt-0">
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="campaignUrl"
                            label="Website URL"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="campaignSource"
                            label="Source"
                            required
                            persistent-hint
                            hint="The referrer: (e.g. google, newsletter)"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="campaignMedium"
                            label="Medium"
                            required
                            persistent-hint
                            hint="Marketing medium: (e.g. cpc, banner, email)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="campaignName"
                            label="Campaign Name"
                            required
                            persistent-hint
                            hint="Product, promo code, or slogan (e.g. spring_sale)"
                            :error="!isCampaignNameUnique"
                          ></v-text-field>
                          <span v-if="!isCampaignNameUnique" class="error--text">Campaing Name already exists</span>
                        </v-flex>
                        <v-flex xs12 class="generated-link-wrapper">
                          <p class="mt-3">Your generated UTM link</p>
                          <v-text-field
                            v-show="this.campaignUrl"
                            :value="returnGeneratedUrl"
                            name="input-1"
                            readonly
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      v-clipboard:copy="returnGeneratedUrl"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onCopyError"
                    >Copy Link</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" type="submit" flat>Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
            <!-- end modal -->

            <v-spacer></v-spacer>
            <!-- Searchbar -->
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <!-- Data Table -->
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              v-bind:search="search"
              v-bind:pagination.sync="pagination"
            >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.campaign_name }}</td>
              <td class="text-xs-right">{{ new Date(props.item.campaign_created).toLocaleDateString() }}</td>
              <td class="text-xs-right">{{ props.item.campaign_link }}</td>
              <td class="text-xs-right">
                <span @click="showDeleteDialog(props.item)" class="red--text pointer">DELETE</span>
                &nbsp;|&nbsp;
                <span @click="showEditDialog(props.item)" class="pointer">EDIT</span>
                &nbsp;|&nbsp;
                <span class="pointer"
                  v-clipboard:copy="props.item.campaign_link"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onCopyError">COPY LINK
                </span>
              </td>
            </template>
            <!-- Pagination -->
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-layout>
      
      <v-card>
        <v-snackbar
          :timeout="timeout"
          :color="color"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="alertCopyStatus"
        >
          {{ text }}
          <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>

    </v-container>
  </v-content>
</template>

<script>
  import { db } from '../main'
  import queryString from 'query-string'

  export default {
    methods: {
      onCopy: function (e) {
        this.alertCopyStatus = true
        setTimeout(() => {
          this.alertCopyStatus = false
        }, 500)
      },
      onCopyError: function (e) {
        alert('Failed to copy texts')
      },
      updateCampaignData (endpoint, text) {
        this.$store.dispatch(endpoint, text)
      },
      getCampaignData (endpoint) {
        return this.$store.getters[endpoint]
      },
      resetForm () {
        this.$refs.campaignForm.reset()
      },
      handleSave () {
        if (this.editId) {
          this.editDataTable()
        } else {
          this.addDataToTable()
        }
      },
      showAddDialog () {
        this.fillDialog()
        this.editId = null
        this.dialog = true
      },
      showEditDialog (item) {
        const url = item.campaign_link.split('?')
        if (url.length > 0) {
          let parsed = queryString.parse(url[1])
          this.fillDialog({
            url: url[0],
            campaignSource: parsed.utm_source,
            campaignMedium: parsed.utm_medium,
            campaignName: parsed.utm_campaign
          })
        } else {
          this.fillDialog()
        }
        this.editId = item.key
        this.dialog = true
      },
      showDeleteDialog (item) {
        this.$confirm(`Are you sure you want to delete campaign "${item.campaign_name}" ?`, {title: 'Warning'}).then(res => {
          if (res) {
            this.$store.dispatch('camp/deleteDataTable', item)
          }
        })
      },
      fillDialog ({url = '', campaignSource = '', campaignMedium = '', campaignName = ''} = {}) {
        this.campaignUrl = url
        this.campaignSource = campaignSource
        this.campaignMedium = campaignMedium
        this.campaignName = campaignName
      },
      addDataToTable () {
        this.updateCampaignData('camp/updateLoadingState', true)
        this.isCampaignNameUnique = true
        let campaings = db.ref().child('campaigns')
        campaings.orderByChild('campaign_name').equalTo(this.campaignName).once('value', (snapshot) => {
          if (snapshot.val() === null) {
            campaings.push().set({
              campaign_name: this.campaignName,
              campaign_created: new Date().getTime(),
              campaign_link: this.returnGeneratedUrl,
              copy: 'COPY LINK'
            })
            this.resetForm()
            this.dialog = false
            console.log('data pushed to db successfully')
          } else {  // show error
            this.isCampaignNameUnique = false
          }
          this.updateCampaignData('camp/updateLoadingState', false)
        })
      },
      editDataTable () {
        this.updateCampaignData('camp/updateLoadingState', true)
        this.isCampaignNameUnique = true
        this.updateCampaignData('camp/updateDataTable', {
          key: this.editId,
          campaign_name: this.campaignName,
          campaign_link: this.returnGeneratedUrl
        })

        this.resetForm()
        this.dialog = false
        this.updateCampaignData('camp/updateLoadingState', false)
      }
    },
    computed: {
      returnGeneratedUrl () {
        return `${this.campaignUrl}?utm_source=${this.campaignSource}&utm_medium=${this.campaignMedium}&utm_campaign=${this.campaignName}`
      }
    },
    mounted () {
      db.ref().child('campaigns')
    },
    data () {
      return {
        alertCopyStatus: false,
        campaignMedium: '',
        campaignName: '',
        campaignSource: '',
        campaignUrl: '',
        dialog: false,
        headers: this.getCampaignData('camp/getTableHeaders'),
        items: this.getCampaignData('camp/getTableData'),
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        pagination: {},
        search: '',
        tmp: '',
        isCampaignNameUnique: true,
        editId: null,
        color: 'green',
        mode: '',
        timeout: 1000,
        text: 'Copied to clipboard'
      }
    },
    watch: {
      campaignName () {
        // clear the error
        this.isCampaignNameUnique = true
      }
    },
    created () {
      this.$store.dispatch('camp/getDataTable')
    }
  }
</script>

<style>
.generated-link-wrapper .input-group {
  padding-top: 0;
}
.gradient-background {
  background: #005C97;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.copy-success {
  color: green;
  font-weight: bold;
}
</style>
