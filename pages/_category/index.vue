<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row class="mt-3">
          <v-col align="start" cols="12" lg="10" md="10" sm="10">
            <h1 style="text-align: left !important;">
              {{ category }} questions
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="10" md="10" sm="12">
            <h2 style=" fontSize: 17px;font-weight:300">
              Read {{ category }} questions quickly or switch to quiz mode for
              {{ category }} quiz.
            </h2>
          </v-col>
        </v-row>
        <!-- </v-container>
      <v-container class="mt-3"> -->
        <v-row>
          <v-col cols="12" lg="10" md="10" sm="12" xs="12">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
        </v-row>
      </v-container>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        max-width="1000"
        height="150"
        type="card"
      >
      </v-skeleton-loader>
      <ITEMLIST
        v-if="Object.keys(subCategories).length > 0"
        :items="subCategories"
        type="Sub-categories"
        @buttonClick="buttonClick"
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
            <v-container v-if="loadMcq" fluid>
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
              :category="category"
            />
            <QUIZMCQLIST
              v-if="currentMode === 'quiz' && loadMcq === false"
              :mcqs="mcqs"
              :color="color"
              :page="page"
              :category="category"
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
import Header from "../../components/public/header";
import ITEMLIST from "../../components/public/ItemList";
import READINGMCQLIST from "../../components/public/readingMcqList";
import QUIZMCQLIST from "../../components/public/quizMcqList";
import SIDEBAR from "../../components/public/newSideBar";
export default {
  components: { Header, ITEMLIST, READINGMCQLIST, QUIZMCQLIST, SIDEBAR },
  data() {
    return {
      loading: true,
      loadMcq: true,
      page: 1,
      switchMode: "",
      mcqs: [],
      mcqLen: 0,
      color: [],
      subCategories: [],
      category: this.$route.params.category.split("-").join(" "),
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: this.$route.params.category,
          disabled: true,
          href: "/"
        }
      ]
    };
  },
  async asyncData({ params, $axios }) {
    let category = params.category.split("-").join(" ");
    const meta = await $axios.$post(
      "https://path-server-kt6c2.ondigitalocean.app/getcategorymeta",
      {
        category
      }
    );
    return { meta };
  },
  head() {
    return {
      title: `${this.category} mcqs | Path.pk`,
      meta: [
        {
          hid: "c_description",
          name: "description",
          content: `Path.pk | Category: ${this.category} | ${
            this.meta.meta ? this.meta.meta : ""
          }`
        }
      ]
    };
  },
  watch: {
    page(val) {
      this.getCategoryMcqs(val);
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
    await this.getCategoryMcqs(pin);
    this.colorArray();
    this.getSubCategories();
    this.getCategoryMcqsCount();
    this.$store.dispatch("mode/reVerify");
  },

  methods: {
    modeChanger(value) {
      if (value === "reading") this.color = [];
      this.$setCookie("currentMode", value);
    },
    async getSubCategories() {
      let category = this.category.split("-").join(" ");
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/post-mcq-sub-catagories",
        {
          category
        }
      );
      if (res) {
        this.subCategories = res.data.subObj;
        this.loading = false;
      }
    },
    async getCategoryMcqs(page) {
      this.colorArray();
      this.loadMcq = true;
      let category = this.category.split("-").join(" ");
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-category-mcqs",
        {
          category,
          page
        }
      );
      if (res) {
        this.mcqs = res.data.mcqs;
        this.loadMcq = false;
      }
    },
    async getCategoryMcqsCount() {
      const category = this.category;

      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-category-mcqs-count",
        {
          category
        }
      );
      if (res) {
        this.mcqLen = res.data.mcqLen;
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
    buttonClick(sub) {
      const category = this.category.split(" ").join("-");
      const subCategory = sub.split(" ").join("-");

      this.$router.push(category + "/" + subCategory);
    }
  }
};
</script>

<style>
h1 {
  font-family: "Josefin Sans", sans-serif !important;
  font-size: 30px;
}
.row + .row {
  margin-top: 0 !important;
}
</style>
