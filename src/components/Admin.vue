<template>
<v-content style="background: url('https://s3.amazonaws.com/creativetim_bucket/products/64/opt_lbdr_cover.jpg?1505922722')no-repeat;background-size: cover; ">
  <v-container fluid>

    <v-layout column>
      <v-card class="mt-7"> 
        <v-card-title>
          <strong class="headline">UTM Campaigns</strong>
          <v-btn
            @click.native.stop="dialog = !dialog"
            class="text-center"
            color="pink"
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
                      <v-text-field label="Website URL" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="Source" required persistent-hint hint="The referrer: (e.g. google, newsletter)"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="Medium" required persistent-hint hint="Marketing medium: (e.g. cpc, banner, email)"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="Term" required persistent-hint hint="Identify the paid keywords"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="Campaign" required persistent-hint hint="Use to differentiate ads"></v-text-field>
                    </v-flex>
                     <v-flex xs12 sm6>
                      <v-text-field label="Category" required persistent-hint hint="Add a category for your reference"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        class="generated-utm-textarea"
                        name="input-1"
                        label="Your generated UTM link"
                        textarea
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
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
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
            <td class="text-xs-right">{{ props.item.category }}</td>
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
  export default {
    data () {
      return {
        dialog: false,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          { text: 'Link Name', align: 'left', value: 'name' },
          { text: 'Date Created', value: 'created' },
          { text: 'Category', value: 'category' },
          { text: 'Generated UTM Link', value: 'link', sortable: false },
          { text: 'Copy to clipboard', value: 'copy', sortable: false }
        ],
        // Potential todo:
        // 1. add server side loading and pagination
        // 2. allow modal box updating of item after creation
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            created: '21 Dec 2017',
            category: 6.0,
            link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            created: '01 Dec 2017',
            category: 9.0,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Eclair',
            created: '11 Mar 2017',
            category: 16.0,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Cupcake',
            created: '09 Apr 2017',
            category: 3.7,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Gingerbread',
            created: '05 Jun 2017',
            category: 16.0,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Jelly bean',
            created: '21 Jul 2017',
            category: 0.0,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Lollipop',
            created: '18 Dec 2017',
            category: 0.2,
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Honeycomb',
            created: '12 Feb 2017',
            link: 'https://www.linkgoeshere.com',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'Donut',
            created: '21 Mar 2017',
            category: 25.0,
            link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
            copy: 'COPY LINK'
          },
          {
            value: false,
            name: 'KitKat',
            created: '21 Oct 2017',
            category: 26.0,
            link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
            copy: 'COPY LINK'
          }
        ]
      }
    }
  }
</script>

<style>
.mt-7 {
  margin-top: 7em;
}
.generated-utm-textarea > .input-group__input {
  height: 100px;
}
.generated-utm-textarea textarea {
  padding-top: 1em;
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  font-weight: bold;
}
</style>