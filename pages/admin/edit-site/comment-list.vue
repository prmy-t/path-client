<template>
  <div>
    <Header />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="2" md="2" sm="2">
            <v-btn text class="red--text" @click="goBack">
              <v-icon left>arrow_back_ios</v-icon> return
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12" md="12">
            <ITEMLIST
              v-if="sortedMcq.length > 0"
              @buttonClick="buttonClick"
              :items="categories"
              type="Categories"
            />
          </v-col>
        </v-row>
        <v-container>
          <v-row justify="end" dense v-if="mcqs.length !== sortedMcq.length">
            <v-col align="end" cols="12" lg="2" md="2" sm="2">
              <v-btn text class="red--text" @click="showAll">
                show All
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-row
          justify="center"
          v-if="sortedMcq.length > 0"
          v-for="(mcq, index) in sortedMcq"
          :key="mcq.question"
        >
          <v-col class="" cols="12" lg="11" md="11" sm="12" xs="12">
            <v-card width="auto" rounded="lg">
              <v-container>
                <v-card-title>
                  <v-row dense>
                    <v-col align="center" cols="12" lg="1" md="1" sm="1">
                      <div class="font-weight-bold text-h5">
                        {{ parseInt(index) + 1 }}
                      </div>
                    </v-col>
                    <v-col cols="12" lg="11" md="11" sm="11">
                      {{ mcq.question }}
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle class="justify-center">
                  <v-row dense justify="end">
                    <v-col cols="12" lg="2" md="2" sm="3" xs="4">
                      {{ mcq.date }}
                    </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-row dense>
                  <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                  <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                    <v-btn
                      class="font-weight-bold text-subtitle-1"
                      text
                      :color="mcq.optionA === mcq.answer ? 'green' : ''"
                    >
                      A. {{ mcq.optionA }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                  <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                    <v-btn
                      class="font-weight-bold text-subtitle-1"
                      text
                      :color="mcq.optionB === mcq.answer ? 'green' : ''"
                    >
                      B. {{ mcq.optionB }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                  <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                    <v-btn
                      class="font-weight-bold text-subtitle-1"
                      text
                      :color="mcq.optionC === mcq.answer ? 'green' : ''"
                    >
                      C. {{ mcq.optionC }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" lg="1" md="1" sm="1" xs="0" />
                  <v-col cols="12" lg="5" md="5" sm="4" xs="12">
                    <v-btn
                      class="font-weight-bold text-subtitle-1"
                      :color="mcq.optionD === mcq.answer ? 'green' : ''"
                      text
                    >
                      D. {{ mcq.optionD }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider class="mt-2 mb-2"></v-divider>

                <!-- Report section -->
                <v-row dense justify="space-around">
                  <v-col class="red--text font-weight-bold text-h5">
                    Comments
                  </v-col>
                </v-row>
                <div v-for="(comment, index) in mcq.comments" :key="index">
                  <v-row>
                    <v-col cols="12" md="8" lg="8" sm="8">
                      <div class="font-weight-bold text-h6">
                        {{ comment.user }}
                      </div>
                      <div>{{ comment.newComment }}</div>
                    </v-col>
                    <v-col cols="12" md="2" lg="2" sm="2">
                      <div>
                        <v-btn
                          dark
                          class="red"
                          @click="replayComment(mcq._id, comment)"
                          >replay <v-icon right>send</v-icon></v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="2" lg="2" sm="2">
                      <div>
                        <v-btn
                          @click="deleteComment(mcq._id, comment)"
                          outlined
                          color="red"
                          >delete <v-icon>delete </v-icon></v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                  <v-row dense v-if="comment.replay">
                    <v-col cols="12" lg="1" md="1" sm="1"></v-col>
                    <v-col cols="12" md="8" lg="8" sm="8">
                      <div class="font-weight-bold text-subtitle-1">
                        <v-icon color="red" left>admin_panel_settings</v-icon>
                        Admin Replayed to
                        <span class="red--text">{{ comment.user }}</span>
                      </div>
                      <div class="text-subtitle-1 ml-10">
                        {{ comment.replay }}
                      </div>
                    </v-col>
                  </v-row>
                </div>

                <!-- Dialog_delete -->
                <v-dialog v-model="dialogDelete" max-width="560px">
                  <DIALOGDELETE
                    item="Comment"
                    @closeDialog="closeDialog"
                    @deleteConfirm="deleteConfirm"
                  />
                </v-dialog>

                <!-- Dialog_replay -->
                <v-dialog v-model="dialogReplay" max-width="500px">
                  <DIALOGREPLAY
                    :comment="replayingComment"
                    @closeDialog="closeDialog"
                    @replayConfirm="replayConfirm"
                  />
                </v-dialog>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sortedMcq.length < 1">
          <v-col align="center" cols="12" lg="12" md="12">
            No comments found !
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../../components/admin/header";
import ITEMLIST from "../../../components/public/ItemList";
import DIALOGDELETE from "../../../components/admin/dialogs/dialogDelete";
import DIALOGREPLAY from "../../../components/admin/dialogs/dialogReplay";
export default {
  components: { Header, ITEMLIST, DIALOGDELETE, DIALOGREPLAY },

  data() {
    return {
      mcqs: [],
      sortedMcq: [],
      categories: [],
      dialogDelete: false,
      dialogReplay: false,
      replayingComment: {},
      idStore: "",
      deletingComment: ""
    };
  },
  mounted() {
    const token = this.$getCookie("token");
    if (!token) {
      this.$router.push("/admin");
    }
    this.getCategories();
    this.getCommentedMcqs();
  },
  methods: {
    async getCategories() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-commented-categories"
      );
      if (res) {
        this.categories = res.data.commentedCategoryObj;
      }
    },
    async getCommentedMcqs() {
      const res = await this.$axios.get(
        "https://path-server-kt6c2.ondigitalocean.app/admin/get-commented-mcqs"
      );
      if (res) {
        this.mcqs = res.data;
        this.sortedMcq = res.data;
      }
    },
    async replayComment(id, comment) {
      this.idStore = id;
      this.replayingComment = comment;
      this.dialogReplay = true;
    },
    async replayConfirm(replay) {
      const oldComment = this.replayingComment;

      console.log(JSON.stringify(oldComment));
      let id = this.idStore;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/replay-comment",
        { id, oldComment, replay }
      );
      if (res.data.success) {
        this.closeDialog();
        this.getCategories();
        this.getCommentedMcqs();
      } else {
        console.log("unsuccessful");
      }
    },
    async deleteComment(id, rowComment) {
      this.deletingComment = rowComment;
      this.idStore = id;
      this.dialogDelete = true;
    },
    closeDialog() {
      this.dialogDelete = false;
      this.dialogReplay = false;
    },
    async deleteConfirm() {
      let id = this.idStore;
      let comment = JSON.stringify(this.deletingComment);
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/edit-site/delete-comment",
        { id, comment }
      );
      if (res.data.success) {
        this.getCommentedMcqs();
        this.getCategories();
        this.closeDialog();
      }
    },
    goBack() {
      this.$router.push("/admin/edit-site");
    },
    buttonClick(index) {
      let sortedMcq = [];
      for (let i in this.mcqs) {
        if (this.mcqs[i].category === index) sortedMcq.push(this.mcqs[i]);
      }
      this.sortedMcq = sortedMcq;
    },
    showAll() {
      this.sortedMcq = this.mcqs;
    }
  }
};
</script>

<style>
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(2, 5, 9, 0.1) !important;
  color: gray !important;
}
</style>
