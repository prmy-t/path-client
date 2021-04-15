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
        <v-row dense justify="space-around">
          <v-col
            class="text-h5 font-weight-bold"
            cols="12"
            lg="3"
            md="3"
            sm="3"
            xs="10"
          >
            Sidebar Components
          </v-col>
          <v-col
            class="text-h5 font-weight-bold"
            cols="12"
            lg="1"
            md="1"
            sm="1"
            xs="1"
          >
            <v-btn @click="saveComponents" class="red" dark>save</v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" lg="9" md="10" sm="10" xs="12">
            <v-card flat>
              <v-card-text align="center">
                <v-card
                  class="mt-3 mb-5 justify-center"
                  v-for="(component, index) in components"
                  :key="index"
                  rounded="lg"
                  width="80%"
                >
                  <v-row justify="end">
                    <v-col cols="12" lg="4" md="4" sm="4" xs="4">
                      <v-btn @click="deleteComponent(index)" text>
                        <v-icon left color="red">delete</v-icon>Delete
                        Component</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-card-title>
                    <v-text-field
                      v-model="component.title"
                      outlined
                      dense
                      label="Add title"
                    >
                    </v-text-field>
                  </v-card-title>
                  <v-card-text>
                    <v-row v-for="(i, ind) in component.points.length" :key="i">
                      <v-col cols="12" lg="11" md="11" sm="11" xs="10">
                        <v-text-field
                          v-model="component.points[ind]"
                          outlined
                          dense
                          label="Add Point"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="1" md="1" sm="1" xs="1">
                        <v-btn @click="deletePoint(index, ind)" icon>
                          <v-icon color="red">delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row dense justify="end">
                      <v-col cols="12" lg="3" md="3" sm="3" xs="3">
                        <v-btn @click="addPoint(index)" text>
                          <v-icon left class="red--text">add</v-icon>
                          Add point
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-row dense justify="end">
                <v-col cols="12" lg="3" md="3" sm="3" xs="3">
                  <v-btn @click="addComponent" text>
                    <v-icon left class="red--text">add</v-icon>
                    Add component
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar color="green" v-model="snackbar" timeout="2000">
          Components saved

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false">
              close
            </v-btn>
          </template>
        </v-snackbar>
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
      components: [],
      snackbar: false
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
    this.getComponents();
  },
  methods: {
    async getComponents() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-sidebar-components"
      );
      if (res.data) {
        this.components = res.data.components;
      }
    },
    backTo() {
      this.$router.push("/admin/edit-site");
    },
    addComponent() {
      this.components.push({ title: "", points: [""] });
    },
    addPoint(index) {
      this.components[index].points.push("");
    },
    deleteComponent(index) {
      this.components.splice(index, 1);
    },
    deletePoint(index, pointIndex) {
      this.components[index].points.splice(pointIndex, 1);
    },
    async saveComponents() {
      let components = this.components;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/post-sidebar-components",
        { components }
      );
      if (res.data.success) {
        this.snackbar = true;
      }
    }
  }
};
</script>

<style></style>
