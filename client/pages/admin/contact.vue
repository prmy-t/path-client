<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <CONTACT />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../../components/admin/header.vue";
import CONTACT from "../../components/contact";
export default {
  components: { Header, CONTACT },
  head() {
    return {
      title: "Path.pk | Contact",
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

<style>
.facebookClass {
  color: #4267b2;
  font-size: 2rem;
}
.whatsppClass {
  color: green;
  font-size: 2rem;
}
.instaClass {
  font-size: 2rem;
  color: #fb3958;
  height: 2rem;
}
.twitterClass {
  color: #4267b2;
  font-size: 2rem;
}
</style>
