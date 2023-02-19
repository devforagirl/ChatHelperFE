<template>
  <div class="LoginUserBigBox">
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="formSubmitLogin">
                <v-text-field v-model="email" type="email" label="Email" />
                <v-text-field v-model="password" type="password" label="Password" />
                <v-alert v-if="status === 400" type="error">Invalid login info.</v-alert>
                <div class="btnBox">
                  <v-btn type="submit" color="primary" :loading="isLoading">Login</v-btn>
                  <a class="auth-link" @click="toggleComponent">
                    Don't have an account? Create one.
                  </a>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LoginUser',
  data() {
    return {
      email: '',
      password: '',
      status: null,
      isLoading: false
    }
  },
  methods: {
    formSubmitLogin() {
      this.isLoading = true
      this.$store
        .dispatch('action_login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch((err) => {
          this.status = err.response.status
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    toggleComponent() {
      this.$store.dispatch('isNewUser', !this.$store.state.isNewUser)
    }
  }
}
</script>

<style>
.LoginUserBigBox {
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.auth-link {
  font-size: 0.8em;
  text-decoration: underline;
  color: #2c3e50;
  cursor: pointer;
}
</style>
