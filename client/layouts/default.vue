<template>
  <v-app id="inspire">
    <nuxt />

    <Footer />
  </v-app>
</template>
<script>
import Footer from "../components/footer";
export default {
  components: { Footer },
  computed: {},
  mounted() {
    this.reVerify();
  },
  methods: {
    reVerify() {
      this.$store.dispatch("auth/reVerify");
      this.$store.dispatch("singleMcq/reVerifyMcq");
    }
  }
};
</script>
<style>
.v-application .primary {
  background-color: #ec4847 !important;
  border-color: white !important;
}
/* .v-application {
  font-family: "Montserrat", sans-serif !important;
} */
.v-application .text-h3 {
  font-family: "Josefin Sans", sans-serif !important;
}
.v-application .text-h4 {
  font-family: "Josefin Sans", sans-serif !important;
}
.v-btn {
  text-transform: capitalize !important;
}
.theme--light.v-application {
  background: #f5f5f5 !important;
}
</style>
