<template>
  <div class="HomeBigBox">
    <div v-if="!user_info">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-text-field
              v-model="inputValue"
              label="Open Sesame!"
              filled
              clear-icon="mdi-close-circle"
              clearable
              type="text"
              @input="handleInput"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else class="welcomebackBox">
      <span> Welcome back, 233 </span>
      <b> {{ user_info.name }}</b><br>
      <router-link to="dashboard">
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {
    ...mapState(['user_info'])
  },
  methods: {
    handleInput() {
      console.log('inputValue asd changed to', this.inputValue)
      if (this.inputValue === process.env.VUE_APP_SESAME) {
        this.$router.push('/authenticate')
      }
    }
  }
}
</script>

<style>
.HomeBigBox {
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
