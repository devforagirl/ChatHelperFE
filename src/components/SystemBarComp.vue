<template>
  <div class="SystemBarBigBox">
    <v-system-bar
      fixed
      dark
      color="primary"
    >

      <NumberComp />

      <v-spacer />

      <div class="connectedUsers">
        usr: {{ roomInfo.length }}
      </div>

      <v-chip
        v-if="socket?socket.socket.connected:false"
        color="green"
        filter
        label
        pill
        outlined
        x-small
      >conn</v-chip>
      <v-chip
        v-else
        color="black"
        filter
        label
        pill
        outlined
        x-small
        @click="btnClickDiscChip"
      >disc</v-chip>

      <v-spacer />

      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>

  </div>
</template>

<script>
import NumberComp from './NumberComp.vue'
import { mapState } from 'vuex'

export default {
  components: { NumberComp },
  data() {
    return {
      flagMsgStat: false
    }
  },
  computed: {
    ...mapState(['chats', 'newChatsLength', 'socket', 'roomInfo', 'msgConnectError'])
  },
  methods: {
    toggleFlagMsgStat() {
      this.flagMsgStat = !this.flagMsgStat
    },
    btnClickDiscChip() {
      this.$toast.error('connect_error->' + this.msgConnectError, { duration: 5000 })
    }
  }
}
</script>

<style>
.progress-linear {
  margin-top: 24px;
  width: 100%;
}
</style>
