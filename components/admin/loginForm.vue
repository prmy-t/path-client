<template>
  <v-card align="center" width="450">
    <v-card-title>
      <div class="display-1">
        Admin Login
      </div>
    </v-card-title>
    <v-card-text>
      <v-row
        ><v-alert
          class="ml-3"
          :value="flag"
          outlined
          dense
          type="error"
          color="#ec4847"
        >
          Email or Password is wrong!
        </v-alert></v-row
      >
      <v-row>
        <v-col align="center">
          <v-text-field
            label="Email"
            :rules="emailRules"
            v-model="email"
            prepend-icon="admin_panel_settings"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-text-field
            :rules="passwordRules"
            prepend-icon="vpn_key"
            type="password"
            label="password"
            v-model="password"
            :append-icon="value ? 'visibility_off' : 'visibility'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mr-3 pb-4">
      <v-spacer></v-spacer>
      <v-btn
        dark
        align="right"
        color="#ec4847"
        class="mt-5"
        type="submit"
        @click="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      flag: false,
      value: true,
      emailRules: [v => !!v || "email is required"],
      passwordRules: [v => !!v || "Password is required"]
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
    validRecord() {
      let status = false;
      const validEmail = this.email;
      const validPassword = this.password.length;

      if (validPassword >= 5 && validEmail) {
        status = true;
      }
      return status;
    }
  },
  methods: {
    submitForm() {},
    async login() {
      const res = await this.$axios.post(
        "https://path-server-kt6c2.ondigitalocean.app/admin/login",
        {
          email: this.email,
          password: this.password
        }
      );
      if (res) {
        if (res.data.flag) {
          this.flag = res.data.flag;
        }
        const token = res.data.token ? res.data.token : null;
        if (token) {
          this.$router.push("/admin/edit-site");
          // localStorage.setItem("token", token);
          this.$setCookie("token", token);
          this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          this.isLoggedIn = true;
        }
      }
    }
  }
};
</script>

<style></style>
