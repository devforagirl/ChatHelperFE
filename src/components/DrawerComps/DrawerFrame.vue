<template>
  <div v-if="flagDrawerVisibility">
    <v-navigation-drawer
      v-model="flagDrawer"
      disable-route-watcher
      app
      right
      color="primary2"
      @transitionend="transitionendFunc"
    >
      <div>DrawerFrame.vue</div>
      <router-view name="rvdrawer" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapState(['flagDrawerVisibility']),
    flagDrawer: {
      get() {
        return this.$store.state.flagDrawer
      },

      set(val) {
        this.$store.commit('change_flagDrawer', val)
      }

      // get: () => store.state.value,
      // set: newValue => store.commit('updateValue', newValue)
    }
  },
  methods: {
    transitionendFunc() {
      console.log('transitionendFunc()')
      if (this.flagDrawer) return
      this.$store.commit('change_flagDrawer_visibility', false)
      this.$router.push('/dashboard')
    }
  }
}

</script>

<style>
.v-switch-box {
  margin: 20px 20px;
  /* background-color: pink; */
}
</style>
