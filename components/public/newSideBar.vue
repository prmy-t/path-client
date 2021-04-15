<template>
  <v-container>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      width="380"
      type="card"
    ></v-skeleton-loader>
    <v-card flat height="auto" class="mt-3 mr-2" v-if="!loading">
      <v-row justify="center">
        <v-col cols="12" lg="11" md="12" sm="12">
          <v-card
            flat
            v-for="(component, index) in components"
            :key="component.title"
          >
            <v-card-title
              class="font-weight-bold"
              style="font-size: 1.15rem  !important;"
            >
              <v-icon class="red--text" left>push_pin</v-icon>
              {{ component.title }}
            </v-card-title>
            <v-card-text class="sideText text-subtitle-1" rounded="lg">
              <v-row v-for="(point, index) in component.points" :key="index">
                <v-col cols="12" lg="1" md="1" sm="1" xs="0">
                  <v-icon left class="red--text">navigate_next</v-icon>
                </v-col>
                <v-col
                  style="font-size: 0.9rem;"
                  cols="12"
                  lg="11"
                  md="11"
                  xs="12"
                >
                  {{ point }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="mr-3 ml-3"></v-divider>
      <v-card-text class="mt-3">
        <v-row>
          <v-col md="12" lg="12" sm="12" cols="12" align="center">
            Contact as:
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center" lg="3" sm="6" md="3">
            <v-btn
              href="https://www.facebook.com/pathpkofficial"
              target="_blank"
              icon
              large
            >
              <font-awesome-icon
                :icon="['fab', 'facebook-square']"
                class="facebookClass"
              />
            </v-btn>
          </v-col>

          <v-col align="center" lg="3" sm="6" md="3">
            <v-btn
              icon
              large
              href="https://www.instagram.com/pathpkofficial/"
              target="_blank"
            >
              <font-awesome-icon
                :icon="['fab', 'instagram-square']"
                class="instaClass"
              />
            </v-btn>
          </v-col>
          <v-col align="center" lg="3" sm="6" md="3">
            <v-btn
              target="_blank"
              href="https://twitter.com/pathpkofficial"
              icon
              large
            >
              <font-awesome-icon
                :icon="['fab', 'twitter']"
                class="twitterClass"
              />
            </v-btn>
          </v-col>
          <v-col align="center" lg="3" sm="6" cols="6" md="3">
            <v-btn
              target="_blank"
              href="https://wa.me/message/GG5VZ77OOXTBE1"
              icon
              large
            >
              <font-awesome-icon
                :icon="['fab', 'whatsapp']"
                class=" whatsppClass"
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      components: []
    };
  },
  mounted() {
    this.getComponents();
  },
  methods: {
    async getComponents() {
      if (this.components.length === 0) {
        const res = await this.$axios.get(
          "https://path-server-kt6c2.ondigitalocean.app/get-components"
        );
        if (res) {
          this.components = res.data.components;
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style>
.sideText {
  text-align: justify;
}
</style>
