<template>
  <div>
    <v-row justify="center">
      <v-col sm="6" cols="8" md="4" lg="4">
        <v-text-field
          v-model="search"
          class="ml-2"
          prepend-inner-icon="search"
          :placeholder="type"
          filled
          dense
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12" xs="12" align="start">
        <p class="text-h4 font-weight-bold ml-3">
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          ({{ Object.keys(items).length }})
        </p>
      </v-col>
    </v-row>
    <v-row v-if="Object.keys(items).length > 0">
      <!-- <v-col>{{ filtereditems }}</v-col> -->
      <v-col
        cols="12"
        lg="3"
        md="4"
        sm="6"
        align="center"
        v-for="(category, index) in filtereditems"
        :key="index"
        v-if="category._id !== null"
      >
        <v-btn
          class="font-weight-bold text-h6"
          height="50"
          width="280"
          dark
          color="#ec4847"
          @click="tagClick(category._id)"
        >
          <div>{{ category._id }}({{ category.count }})</div>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="text-h6" align="center">
        No Data
      </v-col>
    </v-row>
    <v-dialog v-model="metaDialog" width="500">
      <v-card>
        <v-card-title>Add meta Description.</v-card-title>
        <v-card-text>
          <v-textarea
            clearable
            v-model="meta"
            solo
            label="write here..."
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="submit === 'category'"
            dark
            class="red"
            @click="submitMetaCategory"
            >submit</v-btn
          >
          <v-btn
            v-if="submit === 'subCategory'"
            dark
            class="red"
            @click="submitMetaSubCategory"
            >submit</v-btn
          >
          <v-btn
            v-if="submit === 'childCategory'"
            dark
            class="red"
            @click="submitMetaChildCategory"
            >submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    items: {},
    type: String,
    submit: ""
  },
  data() {
    return {
      search: "",
      metaCat: "",
      meta: "",
      metaDialog: false,
      flag: false
    };
  },
  computed: {
    filtereditems() {
      let ans = Object.values(this.items).filter(category => {
        if (category._id !== null)
          return category._id.match(this.formateSearch(this.search));
      });
      return ans;
    }
  },

  methods: {
    formateSearch(search) {
      if (search) {
        const vel = search.split(" ");
        for (var i = 0; i < vel.length; i++) {
          vel[i] = vel[i].charAt(0).toUpperCase() + vel[i].slice(1);
        }
        let value = vel.join(" ");

        return value;
      } else return "";
    },

    async tagClick(name) {
      let res = "";
      if (this.submit === "category") {
        let category = name;
        this.metaCat = name;
        res = await this.$axios.post(
          "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/getcategorymeta",
          {
            category
          }
        );
      }
      if (this.submit === "subCategory") {
        let subCategory = name;
        this.metaCat = name;
        res = await this.$axios.post(
          "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/getsubcategorymeta",
          {
            subCategory
          }
        );
      }
      if (this.submit === "childCategory") {
        let childCategory = name;
        this.metaCat = name;
        res = await this.$axios.post(
          "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/getchildcategorymeta",
          {
            childCategory
          }
        );
      }
      if (res) {
        if (res.data.cat === null) {
          this.meta = "";
          this.flag = false;
          this.metaDialog = true;
        }
        if (res.data.cat !== null) {
          this.meta = res.data.cat.meta;
          this.flag = true;
          this.metaDialog = true;
        }
      }
    },
    async submitMetaCategory() {
      let category = this.metaCat;
      let meta = this.meta;
      let flag = this.flag;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/oncategory",
        {
          category,
          meta,
          flag
        }
      );
      if (res) {
        this.metaDialog = false;
      }
    },
    async submitMetaSubCategory() {
      let subCategory = this.metaCat;
      let meta = this.meta;
      let flag = this.flag;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/onsubcategory",
        {
          subCategory,
          meta,
          flag
        }
      );
      if (res) {
        this.metaDialog = false;
      }
    },
    async submitMetaChildCategory() {
      let childCategory = this.metaCat;
      let meta = this.meta;
      let flag = this.flag;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/meta-config/onchildcategory",
        {
          childCategory,
          meta,
          flag
        }
      );
      if (res) {
        this.metaDialog = false;
      }
    }
  }
};
</script>

<style></style>
