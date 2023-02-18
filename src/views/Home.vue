<template>
  <div class="centered-input">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-text-field v-model="inputValue" label="Open Sesame!" />
        </v-col>
      </v-row>
      <div>{{ decode }}</div>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="videoIdAddress"
            :rules="[rules.required, rules.min]"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Video Address"
            type="text"
            @click:append-outer="sendVid"
            @click:clear="clearMessage"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    clearMessage() {
      this.$store.commit("set_videoIdAddress", "")
    },
    sendVid() {
      this.$store.dispatch("action_updateVideoId", this.videoIdAddress)
    }
  }
  // computed: {
  //   decode() {
  //     if (this.inputValue === process.env.VUE_APP_SESAME) {
  //       // console.log('inputValue->', this.inputValue)
  //       this.$router.push('authenticate')
  //     }
  //     return '233'
  //   }
  // }
}
</script>

<style>
.centered-input {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
