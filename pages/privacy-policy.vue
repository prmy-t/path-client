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
import Header from "../components/public/header.vue";
import PRIVACYPOLICY from "../components/privacy-policy";
export default {
  components: { Header, PRIVACYPOLICY },
  head() {
    return {
      title: "Path.pk | Privacy & policy",
      meta: [
        {
          hid: "p&p_description",
          name: "description",
          content:
            "Privacy Policy for Path.pk At Path.pk, accessible from www.path.pk, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Path.pk and how we use it."
        }
      ]
    };
  }
};
</script>
