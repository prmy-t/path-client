<template>
  <div>
    <Header />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="4" xs="12">
            <v-btn text dark color="red" @click="backTo">
              <v-icon left>navigate_before </v-icon> return</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <ITEMLIST type="categories" :items="categories" />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../../../components/admin/header";
import ITEMLIST from "../../../../components/admin/ItemList";
export default {
  layout: "admin",
  components: { Header, ITEMLIST },

  data() {
    return {
      categories: {}
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
    this.categoryTable();
  },
  methods: {
    async categoryTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table/by-categories"
      );
      if (res) {
        this.categories = res.data.categories;
      }
    },
    backTo() {
      this.$router.push("/admin/edit-site");
    }
  }
};
</script>

<style></style>
