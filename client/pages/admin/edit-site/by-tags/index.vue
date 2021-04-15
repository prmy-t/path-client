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
        <ITEMLIST type="tags" :items="tags" />
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
      tags: {}
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
    this.tagsTable();
  },
  methods: {
    async tagsTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table/by-tags"
      );
      if (res) {
        let tagObj = res.data.tagObj;
        let mainObj = [];
        for (let i in tagObj) {
          let tags = tagObj[i]._id;
          for (let j in tags) {
            if (tags[j] !== "" && tags[j] !== null) {
              mainObj.push({ _id: tags[j], count: tagObj[i].count });
            }
          }
        }
        this.tags = mainObj;
      }
    },
    backTo() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
