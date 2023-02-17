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
    <!-- test5
    <v-divider />
    <div class="testBox">
      <v-btn @click="btnClickConn">conn</v-btn>
      <v-btn @click="btnClickEmit">emit</v-btn>
      <v-btn @click="btnClickDisc">disc</v-btn>
    </div> -->
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

    // // test5
    // btnClickConn() {
    //   console.log('btnClickConn-initializeSocket')
    //   this.$store.dispatch('initializeSocket')
    // },

    // btnClickEmit() {
    //   console.log('btnClickEmit-emit5')
    //   this.$store.dispatch('emit5')
    // },

    // btnClickDisc() {
    //   this.$store.dispatch('disconnectSocket')
    //   console.log('btnClickDisc')
    // }
  }
}
</script>
