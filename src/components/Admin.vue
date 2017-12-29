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
                          @keyup.stop="updateCampaignData('camp/updateCampaignUrl', $event.target.value)" 
                          label="Website URL" 
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          @keyup.stop="updateCampaignData('camp/updateCampaignSource', $event.target.value)" 
                          label="Source" 
                          required 
                          persistent-hint 
                          hint="The referrer: (e.g. google, newsletter)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          @keyup.stop="updateCampaignData('camp/updateCampaignMedium', $event.target.value)" 
                          label="Medium" 
                          required 
                          persistent-hint 
                          hint="Marketing medium: (e.g. cpc, banner, email)"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field 
                          @keyup.stop="updateCampaignData('camp/updateCampaignName', $event.target.value)"
                          label="Campaign Name" 
                          required 
                          persistent-hint 
                          hint="Product, promo code, or slogan (e.g. spring_sale)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 class="generated-link-wrapper">
                        <p class="mt-3">Your generated UTM link</p>
                        <v-text-field
                          v-show="getCampaignData('camp/getCampaignUrl')"
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
                  <v-btn color="blue darken-1" flat @click.native="addLinkToTable()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- end modal -->

            <v-spacer></v-spacer>

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
              <td>
                <v-edit-dialog lazy>
                  {{ props.item.name }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.name"
                    single-line
                    counter
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="text-xs-right">{{ props.item.created }}</td>
              <td class="text-xs-right">{{ props.item.campaign }}</td>
              <td class="text-xs-right">{{ props.item.link }}</td>
              <td class="text-xs-right pr-0 pointer">{{ props.item.copy }}</td>
              <td class="text-xs-right">
                <v-edit-dialog
                  @open="tmp = props.item.iron"
                  @save="props.item.iron = tmp || props.item.iron"
                  large
                  lazy
                >
                  <div>{{ props.item.iron }}</div>
                  <div slot="input" class="mt-3 title">Update Iron</div>
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="tmp"
                    single-line
                    counter
                    autofocus
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
              </td>
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
  // Potential todo:
  // 1. add server side loading and pagination
  // 2. allow modal box updating of item after creation
  export default {
    methods: {
      updateCampaignData (endpoint, text) {
        this.$store.dispatch(endpoint, text)
      },
      getCampaignData (endpoint) {
        return this.$store.getters[endpoint]
      },
      addLinkToTable () {
        this.dialog = false
        // testing db
        db.ref().child('campaigns').push().set({
          campaign_created: new Date().getTime(),
          campaign_medium: this.getCampaignData('camp/getCampaignMedium'),
          campaign_name: this.getCampaignData('camp/getCampaignName'),
          campaign_source: this.getCampaignData('camp/getCampaignSource'),
          campaign_url: this.getCampaignData('camp/getCampaignUrl'),
          campaign_generated_link: this.returnGeneratedUrl
        })
        console.log('data added to table')
      }
    },
    computed: {
      returnGeneratedUrl () {
        return `${this.getCampaignData('camp/getCampaignUrl')}?utm_source=${this.getCampaignData('camp/getCampaignSource')}&utm_medium=${this.getCampaignData('camp/getCampaignMedium')}&utm_campaign=${this.getCampaignData('camp/getCampaignName')}`
      }
    },
    data () {
      return {
        dialog: false,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: this.getCampaignData('camp/getTableHeaders'),
        items: this.getCampaignData('camp/getTableData')
      }
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