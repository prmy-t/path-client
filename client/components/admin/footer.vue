<template>
  <div>
    <v-bottom-navigation app absolute dark background-color="#ec4847">
      <v-btn @click="homeEvent">
        <span class="text-subtitle-1 font-weight-bold">Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <!-- BUTTON 2 -->
      <v-bottom-sheet v-model="sheet" inset>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <span class="text-subtitle-2 font-weight-bold">Catagories</span>
            <v-icon>description </v-icon>
          </v-btn>
        </template>
        <v-sheet class="text-center" height="auto" width="auto" rounded="lg">
          <v-row justify="space-between" align="center">
            <v-spacer></v-spacer>
            <v-col justify="top" align="end" cols="12" md="4" sm="4">
              <v-btn class="mr-3" text color="error" @click="sheet = !sheet">
                close
              </v-btn>
            </v-col>
          </v-row>
          <v-container>
            <v-row justify="center" class="mt-1 ">
              <v-col
                v-for="(item, index) in categories"
                :key="index"
                cols="6"
                lg="3"
                md="3"
                sm="6"
              >
                <v-btn
                  dark
                  color="#ec4847"
                  @click="selectCategory(item._id)"
                  width="160"
                >
                  {{ item._id }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="mb-8"></v-row>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>

      <!-- BUTTON 3 -->
      <v-btn @click="snackbar = true">
        <span class="text-subtitle-2 font-weight-bold">Past Papers</span>
        <v-icon>restore_page </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-snackbar dark color="grey darken-3" v-model="snackbar" timeout="2000">
      Coming Soon
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
      sheet: false,
      snackbar: false
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(isLoggedIn) {
        this.$store.commit("auth/SET_ISLOGGEDIN", isLoggedIn);
      }
    }
  },
  mounted() {
    this.categoryData();
  },
  methods: {
    async categoryData() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/get-mcq-catagories"
      );
      if (res) {
        this.categories = res.data.categories;
      }
    },
    homeEvent() {
      this.$router.push("/");
    },
    selectCategory(name) {
      this.sheet = false;
      const url = name.split(" ").join("-");
      this.$router.push("/" + url);
    }
  }
};
</script>
