<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row class="mt-3">
          <v-col align="start" cols="12" lg="10" md="10" sm="10">
            <h1 style="text-align: left !important;">
              {{ subCategory }} questions
            </h1>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" lg="10" md="10" sm="12">
            <h2 style=" font-size: 17px;font-weight: 300 !important">
              Read {{ subCategory }} questions quickly or switch to quiz mode
              for {{ subCategory }} quiz.
            </h2>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="mt-3">
        <v-row dense>
          <v-col cols="12" lg="6" md="6" sm="12" xs="12">
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
        v-if="Object.keys(childCategories).length > 0"
        :items="childCategories"
        type="Child-categories"
        @buttonClick="buttonClick"
      />

      <v-row dense justify="end">
        <v-col cols="5" lg="3" md="3" sm="3">
          <v-switch
            @change="modeChanger(currentMode)"
            v-model="currentMode"
            false-value="reading"
            label="Quiz Mode"
            color="red"
            true-value="quiz"
            inset
          ></v-switch>
        </v-col>
      </v-row>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" md="8" lg="8" sm="9">
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
              :category="subCategory"
            />
            <QUIZMCQLIST
              v-if="currentMode === 'quiz' && loadMcq === false"
              :mcqs="mcqs"
              :color="color"
              :page="page"
              :category="subCategory"
            />
          </v-col>
          <v-col
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
import Header from "../../../components/public/header";
import ITEMLIST from "../../../components/public/ItemList";
import READINGMCQLIST from "../../../components/public/readingMcqList";
import QUIZMCQLIST from "../../../components/public/quizMcqList";
import SIDEBAR from "../../../components/public/newSideBar";

export default {
  components: { Header, ITEMLIST, READINGMCQLIST, QUIZMCQLIST, SIDEBAR },

  async asyncData({ params, $axios }) {
    let subCategory = params.subCategory.split("-").join(" ");
    const meta = await $axios.$post(
      "https://path-server-kt6c2.ondigitalocean.app/getsubcategorymeta",
      {
        subCategory
      }
    );
    return { meta };
  },
  head() {
    return {
      title: `${this.subCategory} mcqs | Path.pk`,
      meta: [
        {
          hid: "sc_description",
          name: "description",
          content: `Path.pk | Sub Category: ${this.subCategory} | ${
            this.meta.meta ? this.meta.meta : ""
          }`
        }
      ]
    };
  },
  data() {
    return {
      loading: true,
      loadMcq: true,
      page: 1,
      mcqLen: 0,
      mcqs: [],
      color: [],
      childCategories: [],
      category: this.$route.params.category,
      subCategory: this.$route.params.subCategory,
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: this.$route.params.category,
          disabled: false,
          href: `/${this.$route.params.category}`
        },
        {
          text: this.$route.params.subCategory,
          disabled: true,
          href: `/${this.$route.params.subCategory}`
        }
      ]
    };
  },
  watch: {
    page(val) {
      this.getSubCategoryMcqs(val);
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
    await this.getSubCategoryMcqs(pin);
    this.colorArray();
    this.getSubCategoryMcqsCount();
    this.getChildCategories();
    this.$store.dispatch("mode/reVerify");
  },
  methods: {
    modeChanger(value) {
      if (value === "reading") this.color = [];
      this.$setCookie("currentMode", value);
    },
    async getChildCategories() {
      let subCategory = this.subCategory.split("-").join(" ");
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/post-mcq-child-catagories",
        {
          subCategory
        }
      );
      if (res) {
        this.childCategories = res.data.childObj;
        this.loading = false;
      }
    },
    async getSubCategoryMcqs(page) {
      this.colorArray();
      this.loadMcq = true;
      let subCategory = this.subCategory.split("-").join(" ");
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-subcategory-mcqs",
        {
          subCategory,
          page
        }
      );
      if (res) {
        this.mcqs = res.data.mcqs;
        this.loadMcq = false;
      }
    },
    async getSubCategoryMcqsCount() {
      const subCategory = this.subCategory.split("-").join(" ");
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-subcategory-mcqs-count",
        {
          subCategory
        }
      );
      if (res) {
        this.mcqLen = res.data.mcqLen;
      }
    },
    buttonClick(child) {
      const subCategory = this.subCategory.split(" ").join("-");

      const childCategory = child.split(" ").join("-");
      this.$router.push(subCategory + "/" + childCategory);
    },
    setModeReading() {
      this.currentMode = "reading";
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
