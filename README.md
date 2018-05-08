# utm-tracker

> A fullstack utm tracker

### User stories
Phase One
1. I can create a new campaign url based off my inputs [ X ]
2. The campaign url is stored in a database along with a date timestamp [ X ]
--> On SAVE click, the data goes to database and the fields are cleared
--> The data is pushed onto the data table items array

3. The campaign url can be viewed in a data table [ X ]
4. The data table has a search function to filter data items [ X ]
5. The data table can be sorted by Name, Date Created, Campaign Category [ X ]
6. Data can be removed from the table [ ]
7. Clicking the COPY LINK button copies the generated link to clipboard [ X ]

Phase Two
1. I can retreive my login details on the signin page [ ]
2. I can update my user details via settings in the admin page [ ]
3. Each data table item can be updated by clicking on the table row [ ]




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
