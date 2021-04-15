<template>
  <div>
    <v-app-bar
      class="fixedHeader"
      height="72"
      app
      flat
      absolute
      color="gray lighten-3"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">
          <v-img
            class="mt-2 mb-3"
            src="/images/pathLogo_new_pc.png"
            max-height="130"
            max-width="230"
            contain
          ></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <NuxtLink style="text-decoration:none" to="/">
          <v-btn class="headButton" @click="homeEvent" plain>home</v-btn>
        </NuxtLink>
        <NuxtLink style="text-decoration:none" to="/contact">
          <v-btn class="headButton" plain>contact</v-btn>
        </NuxtLink>
        <NuxtLink style="text-decoration:none" to="/privacy-policy">
          <v-btn class="headButton" plain>privacy policy</v-btn>
        </NuxtLink>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        dark
        large
        depressed
        @click="comingSoon"
        color="#ec4847"
        class="mr-8 font-weight-bold text-subtitle-1"
        >submit MCQ's ?</v-btn
      >
    </v-app-bar>

    <!-- SNACKBAR -->
    <v-snackbar dark color="grey darken-3" v-model="snackbar" timeout="2000">
      Coming Soon

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- NAV DRAWER -->
    <v-navigation-drawer
      style="position:fixed; top:0; left:0; overflow-y:scroll;"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group active-class="red--text text--accent-4">
          <v-list-item @click="navBarHomeEvent">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <NuxtLink style="text-decoration:none" to="/contact">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>phone_in_talk</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink style="text-decoration:none" to="/privacy-policy">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>security</v-icon>
              </v-list-item-icon>
              <v-list-item-title>privacy policy</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <v-divider class="mt-1 mb-1"></v-divider>
          <v-list-item @click="comingSoon">
            <v-list-item-icon>
              <v-icon>question_answer</v-icon>
            </v-list-item-icon>
            <v-list-item-title>submit MCQ's ?</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-divider class="mt-1 mb-1"></v-divider>
      </v-list>
      <SIDEBAR />
    </v-navigation-drawer>
  </div>
</template>
<script>
import SIDEBAR from "../public/sideBar";
export default {
  components: { SIDEBAR },
  data() {
    return {
      snackbar: false,
      drawer: false
    };
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.state.mode.currentMode;
      },
      set(currentMode) {
        this.$store.commit("mode/SET_CURRENTMODE", currentMode);
      }
    },
    target: {
      get() {
        return this.$store.state.scroll.target;
      },
      set(target) {
        this.$store.commit("auth/SET_TARGET", target);
      }
    }
  },
  methods: {
    navBarHomeEvent() {
      this.$router.push("/");
      this.drawer = false;
    },
    homeEvent() {
      this.$router.push("/");
    },
    comingSoon() {
      this.snackbar = true;
      this.drawer = false;
    }
  }
};
</script>
<style>
.headButton {
  color: #000000 !important;
}
.fixedHeader {
  position: fixed !important;
}
</style>
