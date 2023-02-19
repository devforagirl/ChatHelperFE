<template>
  <div>
    <component :is="loginOrRegister" />
  </div>
</template>

<script>
import RegisterUser from '../components/RegisterUser'
import LoginUser from '../components/LoginUser'

export default {
  components: { RegisterUser, LoginUser },
  computed: {
    loginOrRegister() {
      return this.$store.state.isNewUser ? 'LoginUser' : 'RegisterUser'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
