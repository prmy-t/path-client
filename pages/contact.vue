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
import Header from "../components/public/header.vue";
import CONTACT from "../components/contact";
export default {
  components: { Header, CONTACT },
  head() {
    return {
      title: "Path.pk | Contact",
      meta: [
        {
          hid: "contact_description",
          name: " description",
          content:
            "Contact-Details, Email: support@path.pk, Social media contacts"
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
  color: #f5f5f5;
  background: linear-gradient(#25d366, #25d366) 14% 84%/16% 16% no-repeat,
    radial-gradient(#25d366 60%, transparent 0);
  font-size: 2.4rem;
  /* background: #29ac04; */
  /* display: inline-block; */
  /* border-radius: 60px; */
  /* box-shadow: 0px 0px 2px #888; */
  /* padding: 0.5em 0.6em; */
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
