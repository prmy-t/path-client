<template>
  <div>
    <v-row justify="center">
      <v-col sm="6" xs="6" md="4" cols="8">
        <v-text-field
          dense
          v-model="search"
          class="ml-1 mr-1 searchc"
          prepend-inner-icon="search"
          placeholder="Search categories"
          solo
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-10"> </v-row>
    <v-container fluid justify="center">
      <v-row>
        <v-col align="start">
          <p class="text-h4 font-weight-bold ml-3">
            {{ title }}
          </p>
        </v-col>
      </v-row>

      <v-row v-if="categories.hasOwnProperty" justify="start" no-gutters>
        <v-col
          align="center"
          v-for="(category, index) in filteredCategories"
          :key="index"
          class="mb-5"
          cols="6"
          sm="4"
          md="2"
        >
          <v-card
            @click="buttonEvent(index)"
            width="auto"
            :height="$vuetify.breakpoint.xs ? 190 : 200"
            class="ml-1 mb-1 mr-1"
            color="grey lighten-3"
            elevation="1"
            tile
          >
            <v-row>
              <v-chip
                style="font-family:Josefin sans;font-weight:700 !important"
                small
                dark
                color="#ec4847"
                class=" ml-5 mt-3 "
              >
                {{ category.mcqs }} mcqs
              </v-chip>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-icon color="#ec4847" x-large></v-icon>
                <p
                  style="font-family:Josefin sans;height:30px ; font-size:20px"
                  :class="{
                    ' red--text jos': $vuetify.breakpoint.xs,
                    'text-h5 red--text font-weight-bold':
                      $vuetify.breakpoint.smAndUp
                  }"
                >
                  {{ index }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mb-3" align="center">
                <p
                  :class="{
                    'text-subtitle-1 subColor': $vuetify.breakpoint.xs,
                    subColor: $vuetify.breakpoint.smAndUp
                  }"
                >
                  {{ subCount[index] }} Sub Categories
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          md="12"
          class="mt-5 mb-10"
          v-if="categories && !categories.hasOwnProperty"
        >
          <p class="text-h6" align="center">
            No Category Found<v-icon class="ml-1 mb-1"
              >sentiment_very_dissatisfied
            </v-icon>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    categories: {},
    subCount: {},
    title: String
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filteredCategories() {
      let itemObj = {};
      if (this.categories) {
        let ans = Object.keys(this.categories).filter(category => {
          return category.match(this.formateSearch(this.search));
        });
        for (let i in ans) {
          if (this.categories.hasOwnProperty(ans[i])) {
            itemObj[ans[i]] = Object.values(this.categories)[i];
          }
        }
        return itemObj;
      }
    }
  },
  mounted() {},
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
    buttonEvent(name) {
      const url = name.split(" ").join("-");
      this.$router.push("/" + url);
    }
  }
};
</script>

<style scoped>
.jos {
  font-family: Josefin sans !important;
  font-weight: 700 !important;
}
.subColor {
  font-size: 14px;
  color: #ec4748 !important;
  text-decoration: underline !important;
  font-family: "Josefin sans", sans-serif !important;
  font-weight: bold;
  height: 18px;
}
.searchc {
  margin-top: -180px !important;
  z-index: 5 !important;
}
</style>
