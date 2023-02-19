<template>
  <div class="HomeBigBox">
    <div>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <div class="VIfVElseBox">
              <div v-if="!user_info" class="inputBox">
                <v-text-field
                  v-model="inputValue"
                  label="Open Sesame!"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  type="text"
                  @input="handleInput"
                />
              </div>

              <div v-else class="welcomebackBox">
                <span>Welcome back,</span>
                <b>{{ user_info.name }}</b>
                <br><br>
                <div>If you can see this message,</div>
                <div>'Localstorage' was not cleaned successfully.</div>
                <br>
                <router-link to="dashboard">Go to Dashboard</router-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
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

.welcomebackBox {
  color: whitesmoke;
}
</style>
