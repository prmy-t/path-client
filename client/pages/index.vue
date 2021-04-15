<template>
  <div>
    <Header />
    <v-main class="mb-5">
      <v-row class="ma-8"></v-row>
      <v-row align="center">
        <v-col align="center" md="12" sm="12" xs="12">
          <h1
            :class="{
              'text-h4 font-weight-bold': $vuetify.breakpoint.xs,
              'text-h3 font-weight-bold': $vuetify.breakpoint.smAndUp
            }"
          >
            Pakistan's Biggest Learning Source
          </h1>
          <p class="text-h5  font-weight-light">
            Browse and Learn Your Favorite category.
          </p>
          <div class="custom-shape-divider-bottom-1617093559">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </v-col>
      </v-row>
      <v-container v-if="loading" fluid>
        <v-row v-for="i in 2" :key="i">
          <v-col v-for="j in 4" :key="j" cols="6" md="3" lg="3" sm="3">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              height="200"
              type="card"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
      <CATEGORY
        v-if="!loading"
        :categories="categories"
        :subCount="subCount"
        title="Categories"
      />
      <v-row dense justify="end">
        <v-col lg="3" md="3" sm="3" cols="5">
          <v-switch
            class="pull-right"
            v-model="currentMode"
            false-value="reading"
            label="Quiz Mode"
            color="red"
            true-value="quiz"
            inset
            @change="modeChanger(currentMode)"
          ></v-switch>
        </v-col>
      </v-row>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" md="8" lg="8" sm="8">
            <v-container v-for="k in 5" :key="k" v-if="loadMcq" fluid>
              <v-skeleton-loader
                class="mx-auto"
                max-width="750"
                height="300"
                type="card"
              >
              </v-skeleton-loader>
            </v-container>

            <READINGMCQLIST
              v-if="currentMode === 'reading' && loadMcq === false"
              :mcqs="mcqs"
              :page="page"
              category="main"
            />
            <QUIZMCQLIST
              v-if="currentMode === 'quiz' && loadMcq === false"
              :mcqs="mcqs"
              :color="color"
              :page="page"
              category="main"
            />
          </v-col>
          <v-col
            class=""
            v-if="$vuetify.breakpoint.smAndUp"
            cols="12"
            md="4"
            lg="4"
            sm="4"
          >
            <SIDEBAR />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="8" md="8">
            <v-pagination
              class=" mt-5"
              :total-visible="5"
              v-model="page"
              @change="pageChange(page)"
              :length="
                mcqLen % 5 === 0
                  ? parseInt(mcqLen / 5)
                  : parseInt(mcqLen / 5) + 1
              "
            >
            </v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../components/public/header";
import CATEGORY from "../components/public/categories";
import READINGMCQLIST from "../components/public/readingMcqList";
import QUIZMCQLIST from "../components/public/quizMcqList";
import SIDEBAR from "../components/public/newSideBar";
export default {
  components: { CATEGORY, Header, READINGMCQLIST, QUIZMCQLIST, SIDEBAR },

  data() {
    return {
      loading: true,
      loadMcq: true,
      categories: {},
      mcqs: [],
      mcqLen: 0,
      subCount: {},
      page: 1,
      color: [],
      breadcrumbs: [
        {
          text: "Home",
          disabled: true,
          href: "/"
        }
      ]
    };
  },
  head() {
    return {
      title: "Path.pk | Pakistan's Biggest Learning Source",
      meta: [
        {
          hid: "main_description",
          name: "description",
          content:
            "Pakistan's Biggest Learning Source Browse and Learn Your Favorite category."
        }
      ]
    };
  },
  watch: {
    page(val) {
      this.getMcqs(val);
    },
    currentMode(val) {
      if (val === "quiz") {
        this.colorArray();
      }
    }
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.state.mode.currentMode;
      },
      set(currentMode) {
        this.$store.commit("mode/SET_CURRENTMODE", currentMode);
      }
    }
  },
  async mounted() {
    const pin = parseInt(this.$getCookie("page"))
      ? parseInt(this.$getCookie("page"))
      : 1;
    this.$removeCookie("page");
    this.page = pin;
    await this.getMcqs(pin);
    this.colorArray();
    this.getSubCategoryCount();
    this.getMcqCount();
    this.categoryData();
    this.$store.dispatch("mode/reVerify");
  },
  methods: {
    modeChanger(value) {
      if (value === "reading") this.color = [];

      this.$setCookie("currentMode", value);
    },
    async categoryData() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/get-mcq-catagories"
      );
      if (res) {
        let catObj = {};
        let cat = res.data.categories;
        for (let i in cat) {
          if (cat[i]._id in catObj) {
            catObj[cat[i]._id].sub++;
            catObj[cat[i]._id].mcqs += cat[i].count;
          } else catObj[cat[i]._id] = { sub: 1, mcqs: cat[i].count };
        }
        this.categories = catObj;
        this.loading = false;
      }
    },
    async getMcqCount() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/get-mcqs-count"
      );
      if (res) {
        this.mcqLen = res.data.mcqLen;
      }
    },
    async getSubCategoryCount() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/get-subcategory-count"
      );
      if (res) {
        this.subCount = res.data.subObj;
      }
    },
    async getMcqs(page) {
      this.loadMcq = true;
      this.colorArray();
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-mcqs",
        {
          page
        }
      );
      if (res) {
        this.loadMcq = false;
        this.mcqs = res.data.mcqs;
      }
    },
    setModeReading() {
      this.currentMode = "reading";
      this.$setCookie("currentMode", this.currentMode);
    },
    colorArray() {
      this.color = [];
      for (let i = 0; i < Object.keys(this.mcqs).length; i++) {
        this.color.push({ cA: "", cB: "", cC: "", cD: "" });
      }
    },
    setModeQuiz() {
      this.colorArray();
      this.currentMode = "quiz";
      this.$setCookie("currentMode", this.currentMode);
    },
    categorySelect(name) {
      const url = name.split(" ").join("-");
      this.$router.push("/" + url);
    }
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
h1 {
  text-align: center;
}
.header {
  height: 500px;
  width: 100%;
}
.custom-shape-divider-bottom-1617093559 {
  position: relative !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 100% !important;
  overflow: hidden !important;
  line-height: 0 !important;
  transform: rotate(180deg) !important;
  overflow: visible !important;
}

.custom-shape-divider-bottom-1617093559 svg {
  position: relative !important;
  display: block !important;
  width: calc(100% + 1.3px) !important;
  height: 249px !important;
  transform: rotateY(180deg) !important;
  overflow: visible !important;
}

.custom-shape-divider-bottom-1617093559 .shape-fill {
  fill: #ec4847 !important;
  overflow: visible !important;
}

.v-application .red--text {
  color: #ec4847 !important;
}

.v-application .text-h5 {
  font-family: "Josefin Sans", sans-serif !important;
}
</style>
