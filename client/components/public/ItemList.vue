<template>
  <v-container>
    <v-row justify="space-between" dense>
      <v-col align="start" cols="12" lg="3" md="3" sm="4">
        <p class="text-h5 font-weight-medium ">
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          ({{ Object.keys(filtereditems).length }})
        </p>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="4">
        <v-text-field
          v-model="search"
          class="ml-2"
          prepend-inner-icon="search"
          :placeholder="'Search ' + type"
          filled
          dense
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-container>
      <v-row
        justify="start"
        style="background:#EEEEEE ;border-radius: 5px"
        v-if="Object.keys(items).length > 0"
      >
        <v-col
          align="center"
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="(tag, index) in filtereditems"
          :key="index"
        >
          <v-btn
            text
            label
            class="font-weight-medium text-subtitle-1 "
            height="45"
            width="auto"
            dark
            color="#ec4847"
            @click="tagClick(index, tag)"
          >
            <v-icon left>folder</v-icon>
            <div>{{ index }} ({{ tag }})</div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  props: {
    items: {},
    type: String
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filtereditems() {
      let itemObj = {};
      let ans = Object.keys(this.items).filter(tag => {
        return tag.match(this.formateSearch(this.search));
      });
      for (let i in ans) {
        if (this.items.hasOwnProperty(ans[i])) {
          itemObj[ans[i]] = Object.values(this.items)[i];
        }
      }
      return itemObj;
    }
  },

  methods: {
    formateSearch(search) {
      if (search) {
        const vel = search.split(" ");
        for (var i = 0; i < vel.length; i++) {
          vel[i] = vel[i].charAt(0).toUpperCase() + vel[i].slice(1);
        }
        let value = vel.join(" ");

        return value;
      } else return "";
    },

    async tagClick(index) {
      this.$emit("buttonClick", index);
    }
  }
};
</script>

<style></style>
