<template>
  <v-dialog
    v-if="flagDialog"
    v-model="flagDialog"
    persistent
    max-width="85%"
  >
    <v-card v-click-outside="onDailClickOutside">
      <router-view name="rvdialog" />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['flagDialog'])
  },
  methods: {
    onDailClickOutside() {
      this.$store.commit('change_flagDialog', false)

      if (!this.flagDrawerVisibility) {
        this.$store.commit('change_flagDrawer_visibility', true)
      }

      this.$router.go(-1)
    }
  }
}
</script>

