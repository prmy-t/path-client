<template>
  <div>
    <v-row justify="center">
      <v-col sm="6" xs="12" md="3">
        <v-text-field
          v-model="search"
          class="ml-2"
          prepend-inner-icon="search"
          placeholder="Search subCategories"
          filled
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-10"> </v-row>
    <v-container justify="center">
      <v-row>
        <v-col align="start">
          <p class="text-h4 font-weight-bold ml-3">
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row v-if="subCategories.hasOwnProperty" justify="start" no-gutters>
        <v-col
          align="center"
          v-for="(category, index) in filteredSubCategories"
          :key="index"
          class="mb-5"
          cols="12"
          xs="12"
          sm="4"
          md="3"
        >
          <v-card
            width="auto"
            height="230px"
            class="ml-1 mb-1 mr-2"
            color="grey lighten-3"
          >
            <v-row>
              <v-chip dark class="font-weight-bold ml-5 mt-3 red">
                {{ category }} mcq(s)
              </v-chip>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-icon color="red" x-large></v-icon>
                <p class="red--text text-h5 mt-1">{{ index }}</p>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="mb-3" align="center">
                <a @click="buttonEvent(index)" class=" grey--text text-h6 "
                  >20 Sub subCategories</a
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          md="12"
          class="mt-5 mb-10"
          v-if="subCategories && !subCategories.hasOwnProperty"
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
    subCategories: {},
    title: String
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filteredSubCategories() {
      let itemObj = {};
      if (this.subCategories) {
        let ans = Object.keys(this.subCategories).filter(category => {
          return category.match(this.formateSearch(this.search));
        });
        for (let i in ans) {
          if (this.subCategories.hasOwnProperty(ans[i])) {
            itemObj[ans[i]] = Object.values(this.subCategories)[i];
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
