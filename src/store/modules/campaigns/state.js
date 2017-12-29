export const state = {
  campaign: {
    dataSubmitted: false,
    generatedUrl: '',
    loading: false,
    medium: '',
    name: '',
    source: '',
    url: '',
    tableHeaders: [
      { text: 'Link Name', align: 'left', value: 'name' },
      { text: 'Date Created', value: 'created' },
      { text: 'Campaign', value: 'campaign' },
      { text: 'Generated UTM Link', value: 'link', sortable: false },
      { text: 'Copy to clipboard', value: 'copy', sortable: false }
    ],
    tableData: [
      {
        value: false,
        name: 'Frozen Yogurt',
        created: '21 Dec 2017',
        campaign: 'Paleohacks',
        link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Ice cream sandwich',
        created: '01 Dec 2017',
        campaign: 'Wildblend',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Eclair',
        created: '11 Mar 2017',
        campaign: 'PurePharma',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Cupcake',
        created: '09 Apr 2017',
        campaign: 'YumBalls',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Gingerbread',
        created: '05 Jun 2017',
        campaign: 'Google Ads',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Jelly bean',
        created: '21 Jul 2017',
        campaign: 'Reipes R Us',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Lollipop',
        created: '18 Dec 2017',
        campaign: 'Keto Karbs',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Honeycomb',
        created: '12 Feb 2017',
        campaign: 'Hello Fresh',
        link: 'https://www.linkgoeshere.com',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'Donut',
        created: '21 Mar 2017',
        campaign: 'Wonder Paleo',
        link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
        copy: 'COPY LINK'
      },
      {
        value: false,
        name: 'KitKat',
        created: '21 Oct 2017',
        campaign: 'Carrot Sticks',
        link: 'https://www.wildblend.co/fudge-pinecones?utm_source=wildblend&utm_medium=facebook&utm_campaign=FudgePinecones&utm_content=ccccccc',
        copy: 'COPY LINK'
      }
    ]
  }
}
