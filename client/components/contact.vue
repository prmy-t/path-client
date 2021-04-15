<template>
  <div>
    <v-row><v-col></v-col> </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <!-- <v-sheet color="white" elevation="1" height="200" width="auto"> -->
        <v-card class="" height="400" rounded="lg" width="auto">
          <v-card-title class="font-weight-bold text-h5 justify-center ">
            Contact-Details
          </v-card-title>
          <v-card-text align="center" class="mt-5 text-h6 ">
            <v-row dense>
              <v-col>
                WhatsApp: +92-305-7166220
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                Email: support@path.pk
              </v-col>
            </v-row>
            <v-row class="mt-10"></v-row>
            <v-row dense>
              <v-col class="black--text font-weight-bold text-h5 mt-5 ">
                Social media
              </v-col>
            </v-row>
            <v-row class="mt-5 ">
              <v-col>
                <v-btn
                  href="https://www.facebook.com/pathpkofficial"
                  target="_blank"
                  icon
                  large
                >
                  <font-awesome-icon
                    :icon="['fab', 'facebook-square']"
                    class="facebookClass"
                  />
                </v-btn>
              </v-col>

              <v-col>
                <v-btn
                  icon
                  large
                  href="https://www.instagram.com/pathpkofficial/"
                  target="_blank"
                >
                  <font-awesome-icon
                    :icon="['fab', 'instagram-square']"
                    class="instaClass"
                  />
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  target="_blank"
                  href="https://twitter.com/pathpkofficial"
                  icon
                  large
                >
                  <font-awesome-icon
                    :icon="['fab', 'twitter']"
                    class=" twitterClass"
                  />
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  target="_blank"
                  href="https://wa.me/message/GG5VZ77OOXTBE1"
                  icon
                  large
                >
                  <font-awesome-icon
                    :icon="['fab', 'whatsapp']"
                    class=" whatsppClass"
                  />
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <!-- </v-sheet> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
