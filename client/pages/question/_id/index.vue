<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-btn text @click="goBack" dark color="red">
              <v-icon small>arrow_back_ios </v-icon> back</v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" lg="10" md="10" sm="10" xs="10">
            <v-card flat rounded="lg">
              <v-card-title class="font-weight-bold">
                <v-row>
                  <v-col cols="12" lg="12" md="12">
                    <h1
                      :class="{
                        'text-h4': $vuetify.breakpoint.smAndUp,
                        'text-h5': $vuetify.breakpoint.xs
                      }"
                    >
                      {{ pageMcq.question }}
                    </h1>
                  </v-col>
                </v-row>
              </v-card-title>

              <v-row dense>
                <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                  <v-btn
                    :color="pageMcq.optionA === pageMcq.answer ? 'green' : ''"
                    class="font-weight-bold text-subtitle-1"
                    text
                  >
                    A. {{ pageMcq.optionA }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                  <v-btn
                    :color="pageMcq.optionB === pageMcq.answer ? 'green' : ''"
                    class="font-weight-bold text-subtitle-1"
                    text
                  >
                    B. {{ pageMcq.optionB }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                  <v-btn
                    :color="pageMcq.optionC === pageMcq.answer ? 'green' : ''"
                    class="font-weight-bold text-subtitle-1"
                    text
                  >
                    C. {{ pageMcq.optionC }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                  <v-btn
                    :color="pageMcq.optionD === pageMcq.answer ? 'green' : ''"
                    class="font-weight-bold text-subtitle-1"
                    text
                  >
                    D. {{ pageMcq.optionD }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="12" md="12">
            <v-card flat>
              <v-card-title>
                Comments
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" lg="12" md="12">
                    <v-card flat>
                      <v-card-text
                        v-for="(comment, index) in pageMcq.comments"
                        :key="index"
                      >
                        <v-row dense>
                          <v-col cols="12" lg="12" md="12" sm="12">
                            <div class="font-weight-bold text-h6">
                              <v-avatar
                                v-if="comment.user"
                                color="red"
                                size="20"
                              >
                                <span
                                  class="text-subtitle-1 white--text font-weight-bold "
                                >
                                  {{ comment.user.charAt(0) }}
                                </span>
                              </v-avatar>
                              {{ comment.user }}
                              <span
                                class="font-weight-medium text-subtitle-2"
                                >{{ comment.date }}</span
                              >
                            </div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters>
                          <v-col>
                            <div class="text-subtitle-1 ml-7">
                              {{ comment.newComment }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row no-gutters dense v-if="comment.replay">
                          <v-col cols="12" lg="1" md="1" sm="1"></v-col>
                          <v-col cols="12" md="8" lg="8">
                            <div class="font-weight-bold text-subtitle-1">
                              <v-icon color="red" left
                                >admin_panel_settings</v-icon
                              >
                              Admin:
                            </div>
                            <div class="text-subtitle-1 ml-10">
                              {{ comment.replay }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" lg="12" md="12">
                    <v-card flat>
                      <v-card-title>
                        Add comment
                      </v-card-title>
                      <v-card-text>
                        <form @submit.prevent="addComment">
                          <v-row dense>
                            <v-col cols="6" lg="3" md="3" sm="3">
                              <v-text-field
                                v-model="email"
                                dense
                                label="email"
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="8" md="8" sm="8">
                              <v-text-field
                                v-model="newComment"
                                dense
                                label="comment..."
                                outlined
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" lg="8" md="8">
                              <recaptcha
                                @error="onError"
                                @success="onSuccess"
                                @expired="onExpired"
                              />
                            </v-col>
                            <v-col cols="12" lg="3" md="3" align="end">
                              <v-btn
                                dark
                                color="red"
                                :disabled="validForm"
                                type="submit"
                              >
                                Submit
                              </v-btn>
                            </v-col>
                          </v-row>
                        </form>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../../components/public/header.vue";
export default {
  components: { Header },
  data() {
    return {
      token: "",
      email: "",
      newComment: "",
      pageMcq: ""
    };
  },
  async asyncData({ route, query, store }) {
    try {
      const category = route.path.split("/");
      const mcq = route.path
        .split("/")[2]
        .split("-")
        .join(" ");

      return {
        category,
        mcq
      };
    } catch (err) {
      console.log(err);
    }
  },

  head() {
    return {
      title: `${this.mcq} | Path.pk`,
      meta: [
        {
          hid: "one_description",
          name: "description",
          content: `Path.pk | Question: ${this.mcq}`
        }
      ]
    };
  },
  computed: {
    validForm() {
      let email = this.email && /.+@.+/.test(this.email);
      let newComment = this.newComment;
      let token = this.token;
      if (email && newComment && token) {
        return false;
      }
      return true;
    },
    oneMcq: {
      get() {
        return this.$store.state.singleMcq.oneMcq;
      },
      set(oneMcq) {
        this.$store.commit("singleMcq/SET_ONEMCQ", oneMcq);
      }
    }
  },
  async mounted() {
    if (Object.keys(this.oneMcq).length < 1) {
      const question = this.$route.params.id;
      console.log(question);
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/get-question",
        {
          question
        }
      );
      if (res) {
        this.oneMcq = res.data.mcq;
        this.pageMcq = this.oneMcq;
      }
    } else {
      this.pageMcq = this.oneMcq;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async addComment() {
      const token = await this.$recaptcha.getResponse();
      let email = this.email;
      let newComment = this.newComment;
      let id = this.pageMcq._id;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/post-mcq-comment",
        {
          id,
          email,
          newComment,
          token
        }
      );
      if (res.data.mcq) {
        this.$setCookie("pageMcq", res.data.mcq);
        this.pageMcq = res.data.mcq;
        grecaptcha.reset();
        this.token = "";
        this.email = "";
        this.newComment = "";
      }
    },
    onSuccess(token) {
      this.token = token;
    },
    onError(error) {
      console.log("Error happened:", error);
    },
    onExpired() {
      console.log("Expired");
    }
  }
};
</script>

<style>
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(2, 5, 9, 0.1) !important;
  color: gray !important;
}
.v-application .text-subtitle-1 {
  font-family: Montserrat, sans-serif !important;
  text-align: justify;
}
</style>
