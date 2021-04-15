<template>
  <div class="headerClass">
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
        <router-link :to="isLoggedIn ? '/admin/edit-site' : '/admin'">
          <v-img
            class="mt-2 mb-2"
            src="/images/pathLogo_new_pc.png"
            max-height="130"
            max-width="230"
            contain
          ></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp && isLoggedIn === true">
        <v-btn @click="homeEvent" plain>home</v-btn>
        <NuxtLink style="text-decoration:none" to="/contact">
          <v-btn plain>contact</v-btn>
        </NuxtLink>
        <NuxtLink style="text-decoration:none" to="/privacy-policy">
          <v-btn plain>privacy policy</v-btn>
        </NuxtLink>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp && isLoggedIn === true"
        dark
        depressed
        @click="logOut"
        color="red lighten-1"
        class="mr-8 font-weight-bold text-subtitle-1"
        >Logout <v-icon right>logout </v-icon></v-btn
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
      <div v-if="isLoggedIn === false">
        <v-row class="mt-5">
          <v-col align="center"> login to continue</v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <a @click="drawer = false">Login</a>
          </v-col>
        </v-row>
      </div>
      <v-list v-else nav dense>
        <v-list-item-group active-class="red--text text--accent-4">
          <NuxtLink
            style="text-decoration:none"
            :to="isLoggedIn ? '/admin/edit-site' : '/admin'"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink style="text-decoration:none" to="/admin/contact">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>phone_in_talk</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink style="text-decoration:none" to="/admin/privacy-policy">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>security</v-icon>
              </v-list-item-icon>
              <v-list-item-title>privacy policy</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <v-divider class="mt-1 mb-1"></v-divider>
          <v-list-item @click="logOut">
            <v-list-item-icon>
              <v-icon>logout </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      drawer: false
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(isLoggedIn) {
        this.$store.commit("auth/SET_ISLOGGEDIN", isLoggedIn);
      }
    },
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
    logOut() {
      this.$removeCookie("token");

      this.isLoggedIn = false;
      this.$router.push("/admin");
    },

    homeEvent() {
      this.$router.push("/admin/edit-site");
    }
  }
};
</script>
<style>
#inspire > div > div:nth-child(1) > div > header {
  position: fixed !important;
  top: 0;
  width: 100%;
}
</style>
