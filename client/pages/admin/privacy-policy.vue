<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <PRIVACYPOLICY />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../components/admin/header.vue";
import PRIVACYPOLICY from "../../components/privacy-policy";
export default {
  components: { Header, PRIVACYPOLICY },
  head() {
    return {
      title: "Path.pk | Privacy & policy",
      meta: [
        {
          hid: "home1",
          name: "home",
          content: "Home page description from page"
        }
      ]
    };
  }
};
</script>
