<template>
  <v-app id="inspire">
    <nuxt />

    <Footer />
  </v-app>
</template>
<script>
import Footer from "../components/admin/footer";
export default {
  components: { Footer },
  computed: {},
  mounted() {
    this.reVerify();
  },
  methods: {
    reVerify() {
      this.$store.dispatch("auth/reVerify");
    }
  }
};
</script>
<style>
.theme--light.v-application {
  background: #f5f5f5 !important;
}
</style>
