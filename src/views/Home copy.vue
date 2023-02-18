<template>
  <div class="home">
    <div>Home.vue</div>
    <div v-if="!user_info">
      <div>
        To use the app, you'll need to
        <router-link
          to="authenticate"
          @click.native="isNew(false)"
        >
          Login
        </router-link>
        or
        <router-link
          to="authenticate"
          @click.native="isNew(true)"
        >
          Register
        </router-link>
      </div>
    </div>
    <div
      v-else
      class="welcomebackBox"
    >
      <span> Welcome back, </span>
      <b> {{ user_info.name }}</b><br>
      <router-link to="dashboard"> Go to Dashboard </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user_info'])
  },
  methods: {
    isNew(isNewUser) { this.$store.dispatch('isNewUser', !isNewUser) }
  }
}
</script>
