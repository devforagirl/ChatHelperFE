<template>
  <div class="ColorTabBigBox">改成DisplayTab.vue
    <div class="ThemeBox">
      <div class="v-switch-box">
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          label="Light/Dark"
        />
      </div>
    </div>
    <v-divider />
    <div class="AvatarBox">
      <div class="v-switch-box">
        <v-switch
          v-model="flagAvatar"
          flat
          :label="`Avatar: ${flagAvatar.toString()}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),

  computed: {
    flagAvatar: {
      get() {
        return this.$store.state.user_settings.flagAvatar
      },

      set() {
        this.$store.commit('change_flag_Avatar')
      }
    }

  }
}
</script>
