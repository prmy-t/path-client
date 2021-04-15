<template>
  <v-container class="grey lighten-4" fluid>
    <v-row v-for="(mcq, index) in mcqs" :key="mcq._id">
      <v-col cols="12" lg="1" md="1" sm="1" xs="0"></v-col>
      <v-col cols="12" lg="11" md="11" sm="12" xs="12">
        <v-card rounded="lg" flat>
          <v-container>
            <v-row justify="center" v-if="$vuetify.breakpoint.xsOnly">
              <v-col align="start">
                <v-btn @click="questionPage(mcq, parseInt(index) + 1)" icon>
                  <v-icon color="red">
                    question_answer
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col align="center">
                <div class="font-weight-bold text-h5">
                  {{ page * 5 - 5 + parseInt(index) + 1 }}
                </div>
              </v-col>
              <v-col align="end">
                <v-btn @click="reportMcq(mcq._id)" icon>
                  <v-icon color="red">
                    report
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-card-title>
              <v-row dense>
                <v-col
                  v-if="$vuetify.breakpoint.smAndUp"
                  align="center"
                  cols="12"
                  lg="1"
                  md="1"
                  sm="1"
                >
                  <div class="font-weight-bold text-subtitle-1 ">
                    {{ page * 5 - 5 + parseInt(index) + 1 }}
                  </div>
                </v-col>
                <v-col cols="12" lg="11" md="10" sm="10">
                  <h2 style="font-size: 16px">
                    {{ mcq.question }}
                  </h2>
                </v-col>
              </v-row>
            </v-card-title>
            <!-- <v-card-subtitle class="justify-center">
              <v-row dense justify="end">
                <v-col cols="12" lg="2" md="2" sm="3" xs="4">
                  {{ mcq.date }}
                </v-col>
              </v-row>
            </v-card-subtitle> -->
            <v-row dense>
              <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
              <v-col cols="12" lg="5" md="5" sm="4">
                <v-btn
                  style="height: 28px !important; font-size: 0.8rem !important"
                  :color="
                    color.length > 0 && 'cA' in color[index]
                      ? color[index].cA
                      : ''
                  "
                  @click="optionClick(mcq.optionA, index, 'A')"
                  class="font-weight-bold text-subtitle-1"
                  text
                >
                  A. {{ mcq.optionA }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
              <v-col cols="12" lg="5" md="5" sm="4">
                <v-btn
                  style="height: 28px !important; font-size: 0.8rem !important"
                  :color="
                    color.length > 0 && 'cB' in color[index]
                      ? color[index].cB
                      : ''
                  "
                  @click="optionClick(mcq.optionB, index, 'B')"
                  class="font-weight-bold text-subtitle-1"
                  text
                >
                  B. {{ mcq.optionB }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
              <v-col cols="12" lg="5" md="5" sm="4">
                <v-btn
                  style="height: 28px !important; font-size: 0.8rem !important"
                  :color="
                    color.length > 0 && 'cC' in color[index]
                      ? color[index].cC
                      : ''
                  "
                  @click="optionClick(mcq.optionC, index, 'C')"
                  class="font-weight-bold text-subtitle-1"
                  text
                >
                  C. {{ mcq.optionC }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
              <v-col cols="12" lg="5" md="5" sm="4">
                <v-btn
                  style="height: 28px !important; font-size: 0.8rem !important"
                  :color="
                    color.length > 0 && 'cD' in color[index]
                      ? color[index].cD
                      : ''
                  "
                  @click="optionClick(mcq.optionD, index, 'D')"
                  class="font-weight-bold text-subtitle-1"
                  text
                >
                  D. {{ mcq.optionD }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="$vuetify.breakpoint.smAndUp" no-gutters justify="end">
              <v-col align="end" cols="12" lg="3" md="3" sm="4" xs="12">
                <v-btn
                  @click="questionPage(mcq, parseInt(index) + 1)"
                  dark
                  text
                  class="red--text"
                >
                  comments
                  <v-icon right>mode_comment</v-icon>
                </v-btn>
              </v-col>
              <v-col align="end" cols="12" lg="2" md="2" sm="4" xs="12">
                <v-btn dark text @click="reportMcq(mcq._id)" class="red--text">
                  Report
                  <v-icon right>report </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="reportDialog" width="500">
      <REPORTDIALOG :reportId="reportId" @refresh="refresh" />
    </v-dialog>

    <v-snackbar color="green darken-1" v-model="snackbar" timeout="2000">
      Report submited

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import REPORTDIALOG from "./reportDialog";
export default {
  components: { REPORTDIALOG },
  props: {
    mcqs: {},
    page: Number,
    category: "",
    color: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      reportDialog: false,
      reportId: "",
      snackbar: false
    };
  },
  computed: {
    oneMcq: {
      get() {
        return this.$store.state.singleMcq.oneMcq;
      },
      set(oneMcq) {
        this.$store.commit("singleMcq/SET_ONEMCQ", oneMcq);
      }
    }
  },
  methods: {
    optionClick(selectedOption, index, optionNum) {
      let optionColor = "c" + optionNum;

      if (this.mcqs[index].answer === selectedOption) {
        this.color[index][optionColor] = "green";
      } else this.color[index][optionColor] = "red";
    },
    questionPage(mcq, index) {
      this.$setCookie("page", this.page);
      this.oneMcq = mcq;
      let setMcq = JSON.stringify(this.oneMcq);
      let question = mcq.question.split(" ").join("-");
      this.$setCookie("oneMcq", setMcq);
      this.$router.push("/question/" + question);
    },
    reportMcq(id) {
      this.reportId = id;
      this.reportDialog = true;
    },
    refresh() {
      this.snackbar = true;
      this.reportDialog = false;
    }
  }
};
</script>
<style></style>
