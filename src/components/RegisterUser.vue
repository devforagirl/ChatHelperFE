<template>
  <div class="RegisterUserBigBox">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Register User</v-card-title>
            <v-card-text>
              <form @submit.prevent="formSubmitRegister">
                <v-text-field v-model="name" label="Name" required />
                <v-text-field v-model="email" label="Email" type="email" required />
                <v-text-field v-model="password" label="Password" type="password" required />
                <p v-if="status === 400">Please enter different info.</p>
                <div class="btnBox">
                  <v-btn type="submit" color="primary" :loading="isLoading">Register</v-btn>
                  <a class="auth-link" @click="toggleComponent">Already have an account? Login.</a>
                </div>
              </form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      status: null,
      isLoading: false
    }
  },
  methods: {
    formSubmitRegister() {
      this.isLoading = true
      this.$store
        .dispatch('action_register', {
          name: this.name,
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
.RegisterUserBigBox {
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
