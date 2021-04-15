<template>
  <div>
    <HEADER />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="12" md="12" sm="12" xs="12" align="start">
            <NuxtLink to="/" style="text-decoration:none">
              <v-btn color="#ec4847" text>
                Go to site
              </v-btn>
            </NuxtLink>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center" justify="space-around"> <LOGINFORM /> </v-col
        ></v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import HEADER from "../../components/admin/header";
import LOGINFORM from "../../components/admin/loginForm";
export default {
  layout: "admin",
  components: { HEADER, LOGINFORM }
};
</script>
