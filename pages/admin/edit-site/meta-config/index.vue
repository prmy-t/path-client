<template>
  <div>
    <Header />
    <v-main>
      <v-container fluid
        ><v-row>
          <v-col cols="12" lg="4" md="4" sm="4">
            <v-btn text dark color="red" @click="backTo">
              <v-icon left>navigate_before </v-icon> return</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col lg="2" md="2" sm="4" cols="6">
            <v-btn @click="categoryTable" width="135" dark color="#ec4847"
              >Categories</v-btn
            >
          </v-col>
          <v-col lg="2" md="2" sm="4" cols="6">
            <v-btn @click="subCategoryTable" width="135" dark color="#ec4847"
              >Sub-categories</v-btn
            >
          </v-col>
          <v-col lg="2" md="2" sm="4" cols="6">
            <v-btn @click="childCategoryTable" width="135" dark color="#ec4847"
              >Child-categories</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <ITEMLIST
          v-if="flag === 'c'"
          type="Categories"
          :items="categories"
          submit="category"
        />

        <ITEMLIST
          v-if="flag === 's'"
          type="Sub-categories"
          :items="categories"
          submit="subCategory"
        />

        <ITEMLIST
          v-if="flag === 'ch'"
          type="Child-categories"
          :items="categories"
          submit="childCategory"
        />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../../../components/admin/header";
import ITEMLIST from "../../../../components/admin/metaitem";
export default {
  components: { Header, ITEMLIST },
  data() {
    return {
      categories: {},
      flag: ""
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
  },
  methods: {
    async categoryTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table/by-categories"
      );
      if (res) {
        this.flag = "c";
        this.categories = res.data.categories;
      }
    },
    async subCategoryTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table/by-subcategories"
      );
      if (res) {
        this.flag = "s";
        this.categories = res.data.subCategories;
      }
    },
    async childCategoryTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table/by-childcategories"
      );
      if (res) {
        this.flag = "ch";
        this.categories = res.data.childCategories;
      }
    },
    backTo() {
      this.$router.push("/admin/edit-site");
    }
  }
};
</script>

<style></style>
