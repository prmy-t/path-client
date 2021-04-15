<template>
  <v-card>
    <v-card-title class="headline">Replay to {{ comment.user }}</v-card-title>
    <v-card-text>
      <v-text-field v-model="replay" label="write replay..."> </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
      <v-btn text class="red--text" @click="replayConfirm">
        send <v-icon right>send</v-icon></v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    comment: {}
  },
  data() {
    return {
      replay: ""
    };
  },
  methods: {
    replayConfirm() {
      let replay = this.replay;
      this.$emit("replayConfirm", replay);
    },
    closeDelete() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style></style>
