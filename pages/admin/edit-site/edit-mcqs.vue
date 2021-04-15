<template>
  <div>
    <Header />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="4" xs="12">
            <v-btn dark text color="red" @click="backTo">
              <v-icon left>navigate_before </v-icon> return</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <McqTable :mcqs="mcqs" @refresh="refresh" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../../components/admin/header";
import McqTable from "../../../components/admin/mcqTable";

export default {
  layout: "admin",
  components: { Header, McqTable },

  data() {
    return {
      mcqs: []
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
    this.getMcqTable();
  },
  methods: {
    backTo() {
      this.$router.push("/admin/edit-site");
    },
    async getMcqTable() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-mcq-table"
      );
      if (res) {
        let mcqArray = res.data;
        for (let i in mcqArray) {
          let tags = "";
          let displayTags = [];
          if (mcqArray[i].tags) {
            tags = mcqArray[i].tags.join(", ");
            displayTags = mcqArray[i].tags.join(", ");
          }
          mcqArray[i].tags = tags;
          mcqArray[i].displayTags = displayTags;
        }
        this.mcqs = mcqArray;
      }
    },
    refresh() {
      this.getMcqTable();
    }
  }
};
</script>

<style></style>
