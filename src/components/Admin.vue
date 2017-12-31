<template>
  <v-content class="gradient-background">
    <v-container fluid>

      <v-layout column>
        <v-card class="mt-7"> 
          <v-card-title>
            <strong class="headline text--underline">UTM Campaigns</strong>
            <v-btn
              @click.native.stop="dialog = !dialog"
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
              <v-form @submit.prevent="addDataToTable()" ref="campaignForm">
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
                          ></v-text-field>
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
                    <v-btn color="primary">Copy Link</v-btn>
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
              <td class="text-xs-right">{{ props.item.campaign_created }}</td>
              <td class="text-xs-right">{{ props.item.campaign_link }}</td>
              <td class="text-xs-right pointer">{{ props.item.copy }}</td>
            </template>
            <!-- Pagination -->
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-layout>

    </v-container>
  </v-content>
</template>

<script>
  import { db } from '../main'
  // TODO:
  // 1. Add COPY button functionality
  // 2. Add DELETE button
  export default {
    methods: {
      updateCampaignData (endpoint, text) {
        this.$store.dispatch(endpoint, text)
      },
      getCampaignData (endpoint) {
        return this.$store.getters[endpoint]
      },
      resetForm () {
        this.$refs.campaignForm.reset()
      },
      addDataToTable () {
        this.updateCampaignData('camp/updateLoadingState', true)
        // testing db
        db.ref().child('campaigns').push().set({
          campaign_name: this.campaignName,
          campaign_created: new Date().toLocaleDateString(),
          campaign_link: this.returnGeneratedUrl,
          copy: 'COPY LINK'
        })
        this.resetForm()
        this.dialog = false
        this.$store.dispatch('camp/updateDataTable')
        this.updateCampaignData('camp/updateLoadingState', false)
        console.log('data pushed to db successfully')
      }
    },
    computed: {
      returnGeneratedUrl () {
        return `${this.campaignUrl}?utm_source=${this.campaignSource}&utm_medium=${this.campaignMedium}&utm_campaign=${this.campaignName}`
      }
    },
    data () {
      return {
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
        tmp: ''
      }
    },
    created () {
      this.$store.dispatch('camp/updateDataTable')  // get data from db once
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
</style>