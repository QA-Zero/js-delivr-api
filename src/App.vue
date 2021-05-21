<template>
  <v-app class="page">
    <v-form v-on:submit.prevent="search">
      <v-row
        justify="center"
        no-gutters
      >
        <v-col cols="4">
          <v-text-field
            v-model="query"
            label="Search all of npm"
            clearable
            class="search"
            @click:clear="clear"
          />
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        elevation="4"
        rounded
        @click="search"
        class="btn"
      >Get data</v-btn>
    </v-form>

    <v-container class="content">
      <v-data-table
        :headers="table.header"
        :items="table.content"
        :footer-props="table.footerProps"
        class="table"
        @click:row="openDialog"
      />
    </v-container>

    <v-footer
      class="yellow lighten-5"
      padless
    >
      <v-row
        justify="center"
        no-gutters
        class="author-name"
      >
        <v-col
          class="py-0 text-center title"
          cols="12"
        >
          User name: Ivan
        </v-col>
        <v-col
          class="py-2 text-center headline"
          cols="12"
        >
          <a class="value" href="https://github.com/QA-Zero/js-delivr-api" target="_blank">GitHub</a>
        </v-col>
      </v-row>
    </v-footer>

    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="closeDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list class="dialog">
          <v-list-item>
            <div class="label">Name:</div>
            <div class="value">{{ selectedRow.name }}</div>
          </v-list-item>
          <v-list-item>
            <div class="label">Description:</div>
            <div class="value">{{ selectedRow.description ? selectedRow.description : 'No description' }}</div>
          </v-list-item>
          <v-list-item>
            <div class="label">Version:</div>
            <div class="value">{{ selectedRow.version }}</div>
          </v-list-item>
          <v-list-item>
            <div class="label">License:</div>
            <div class="value">{{ selectedRow.license ? selectedRow.license : 'Any license' }}</div>
          </v-list-item>
          <v-list-item>
            <div class="label">Deprecated:</div>
            <div class="value">{{ selectedRow.deprecated ? 'Yes' : 'No' }}</div>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: 'App',
  data() {
    return {
      query: '',
      table: {
        header: [
          {
            text: 'Package name',
            value: 'name',
            align: 'start',
            sortable: false,
          },
          {
            text: 'Description',
            value: 'description',
            align: 'start',
            sortable: false,
          },
        ],
        content: [],
        footerProps: {
          'items-per-page-options': [10],
        },
      },
      selectedRow: {},
      dialog: false,
    }
  },
  methods: {
    async search() {
      this.clear();
      await this.$store.dispatch(
        'page/getList',
         {
           query: this.query,
           offset: 0,
         },
      );
      this.table.content = this.$store.getters['page/list'];
    },
    clear() {
      this.$store.dispatch('page/clearData');
      this.table.content = this.$store.getters['page/list'];
    },
    openDialog(row) {
      this.selectedRow = row;
      this.dialog = true;
    },
    closeDialog() {
      this.selectedRow = {};
      this.dialog = false;
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.v-input.search {
  input {
    margin-top: 5px;
    padding: 6px 5px;
  }
}

.table {
  margin: 0 25px 25px 25px;
  border: 1px solid #ccc;

  thead {
    background-color: #eee;
  }
}

.dialog {
  .v-list-item {
    min-height: 55px;
  }
  .label {
    float: left;
    margin-right: 15px;
    min-width: 95px;
    font-weight: 700;
    text-align: right;
  }
  .value {
    text-align: left;
  }
}
</style>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;

  .content {
    flex-grow: 1;
  }
}
.search {
  margin-top: 25px;
}
.btn {
  margin: 20px 0 60px 0;
}
</style>
