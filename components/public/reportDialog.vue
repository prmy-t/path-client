<template>
  <v-card>
    <v-card-title>
      <p>Report issue</p>
      <p class="caption">
        If you think something is wrong with this question please report it. We
        will fix it As Soon As Possible.
      </p>
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              v-model="email"
              label="email"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="10" md="10">
            <v-text-field
              v-model="issue"
              label="issue"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <recaptcha
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col align="start">
            <v-btn outlined @click="refreshEvent" class="red--text"
              >cancel</v-btn
            >
          </v-col>
          <v-col align="end">
            <v-btn dark class="red" type="submit" :disabled="validForm"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    reportId: ""
  },
  data() {
    return {
      token: "",
      email: "",
      issue: ""
    };
  },
  computed: {
    validForm() {
      let token = this.token;
      let email = this.email && /.+@.+/.test(this.email);
      let issue = this.issue;
      if (token && email && issue) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async onSubmit() {
      const token = await this.$recaptcha.getResponse();
      const id = this.reportId;
      let email = this.email;
      let issue = this.issue;
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/report/check-token",
        {
          token,
          email,
          issue,
          id
        }
      );

      if (res.data === "success") {
        this.$emit("refresh", true);
        this.token = "";
        this.email = "";
        this.issue = "";
        grecaptcha.reset();
      }
    },
    refreshEvent() {
      this.$emit("refresh", false);
    },
    onSuccess(token) {
      this.token = token;
    },
    onError(error) {
      console.log("Error happened:", error);
    },
    onExpired() {
      grecaptcha.reset();
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
